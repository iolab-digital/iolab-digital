#!/bin/sh
set -e

# Start cron loops if enabled (production only)
if [ "$ENABLE_CRONS" = "true" ]; then
  echo "[cron] Starting cron loops..."

  # Wait for the server to be ready before starting crons
  sleep 30
  echo "[cron] Server should be ready, starting cron loops..."

  # Drip campaign — every hour
  (
    while true; do
      echo "[cron] Running drip campaign..."
      wget -q -O - --header="Authorization: Bearer ${CRON_SECRET}" \
        --post-data="" "http://127.0.0.1:3000/api/demos/drip" 2>&1 || true
      sleep 3600
    done
  ) &

  # Auto blog generation — every 3 days (259200 seconds)
  # First run happens after 3 days, then repeats
  (
    while true; do
      sleep 259200
      echo "[cron] Running blog auto-generate..."
      wget -q -O - --header="Authorization: Bearer ${CRON_SECRET}" \
        "http://127.0.0.1:3000/api/blog/auto-generate" 2>&1 || true
    done
  ) &

  echo "[cron] Cron loops active (drip: hourly, blog: every 3 days)"
else
  echo "[cron] Crons disabled (set ENABLE_CRONS=true to enable)"
fi

# Start the Next.js server
exec node server.js
