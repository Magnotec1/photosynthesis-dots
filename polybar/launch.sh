killall -q polybar
if type "xrandr"; then
  for m in $(xrandr --query | grep " connected" | cut -d" " -f1); do
    MONITOR=$m polybar --reload main &
    MONITOR=$m polybar --reload box1 &
    MONITOR=$m polybar --reload box2 &
    MONITOR=$m polybar --reload box3 &
    MONITOR=$m polybar --reload box4 &
    MONITOR=$m polybar --reload tray &
  done
else
  polybar --reload main &
  polybar --reload box1 &
  polybar --reload box2 &
  polybar --reload box3 &
  polybar --reload box4 &
  polybar --reload tray &
fi

echo "Bars launched..."