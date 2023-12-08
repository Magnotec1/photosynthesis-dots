import gi
import os
import pyautogui
import subprocess
import cairo
import math
import argparse
from math import pi

parser = argparse.ArgumentParser()
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, GdkPixbuf, Gdk

cwd0 = __file__
size0 = len(cwd0)
cwd1 = cwd0[:size0 - 12]

def stringToList(string):
    listRes = list(string.split(" "))
    return listRes

def cwdReturn(string):
    cwdRes = (cwd1, string)
    cwdRes1 = ''.join(cwdRes)
    return cwdRes1

def writeToFile(string, location):
    with open(cwdReturn(location), "a+") as file_object3:
        file_object3.seek(0)
        data = file_object3.read(100)
        if len(data) > 0:
            file_object3.write("\n")
        file_object3.write(string)

def removeFromFile(string, location):
    def removeTrailingNewline(location):
        with open(location, "r+", encoding = "utf-8") as file:
            file.seek(0, os.SEEK_END)
            pos = file.tell() - 1
            while pos > 0 and file.read(1) != "\n":
                pos -= 1
                file.seek(pos, os.SEEK_SET)
            if pos > 0:
                file.seek(pos, os.SEEK_SET)
                file.truncate()
    with open(cwdReturn(location), 'r') as f:
        lines = f.read().splitlines()
        last_line = lines[-1]
        print(last_line)
    with open(cwdReturn(location), "r") as w:
        lines = w.readlines()
    with open(cwdReturn(location), "w") as w:
        for line in lines:
            if string not in line:
                w.write(line)

builder = Gtk.Builder()
builder.add_from_file(cwdReturn('ui/main.glade'))

window1 = builder.get_object("window1")
window2 = builder.get_object("window2")
window3 = builder.get_object("window3")

profilePicture = builder.get_object("profilePicture")
profileLabel = builder.get_object("profileLabel")

scaleVolume = builder.get_object("scaleVolume")
scaleBrightness = builder.get_object("scaleBrightness")
dndSwitch = builder.get_object("dndSwitch")
wifiSwitch = builder.get_object("wifiSwitch")
bluetoothSwitch = builder.get_object("bluetoothSwitch")

with open((cwdReturn('storage/volume')), 'r' ) as vol_scale:
    scaleVolume.set_value(int(vol_scale.read()))
with open((cwdReturn('storage/brightness')), 'r' ) as bright_scale:
    scaleBrightness.set_value(int(bright_scale.read()))

dnd = subprocess.check_output(["bash", (cwdReturn('dnd.sh'))], universal_newlines=True)
if dnd == "true":
    dndSwitch.set_active(False)
elif dnd == "false":
    dndSwitch.set_active(True)
wifi = subprocess.check_output(["nmcli", "networking"], universal_newlines=True).strip()
if wifi == "disabled":
    wifiSwitch.set_active(False)
elif wifi == "enabled":
    wifiSwitch.set_active(True)
bluetooth = subprocess.check_output(["bash", (cwdReturn('bluetooth.sh'))], universal_newlines=True).strip()
if bluetooth == "yes":
    bluetoothSwitch.set_active(False)
elif bluetooth == "no":
    bluetoothSwitch.set_active(True)


class Handler:
    def onDestroy(self, *args):
        Gtk.main_quit()

    def onWifi(self, wifiSwitch):
        if wifiSwitch.get_active():
            os.system("nmcli networking on")
        else:
            os.system("nmcli networking off")
            
    def onDND(self, dndSwitch):
        if dndSwitch.get_active():
            os.system("gsettings set org.gnome.desktop.notifications show-banners false")
        else:
            os.system("gsettings set org.gnome.desktop.notifications show-banners true")
            
    def onVolumeChanged(self, volumeScale):
        volume_scale_float = scaleVolume.get_value()
        volume_scale_int = int(volume_scale_float)
        volume_scale_str = str(volume_scale_int)

        with open((cwdReturn('storage/volume')), 'w' ) as vol_scale:
            vol_scale.write(volume_scale_str)
        subprocess.run(["pulsemixer", "--set-volume", volume_scale_str])

    def onBrightnessChanged(self, brightnessScale):
        bright_scale_float = scaleBrightness.get_value()
        bright_scale_int = int(bright_scale_float)
        bright_scale_str = str(bright_scale_int)
        bright_scale_conv = str(bright_scale_int / 100)
        with open((cwdReturn('storage/brightness')), 'w' ) as bright_scale:
            bright_scale.write(bright_scale_str)
        subprocess.run(["xrandr", "--output", "DP-2", "--brightness", bright_scale_conv])
        subprocess.run(["xrandr", "--output", "DP-0", "--brightness", bright_scale_conv])

    def onSuspend(self, suspendButton):
        os.system("systemctl suspend")
        Gtk.main_quit()

    def onLogout(self, logoutButton):
        os.system("gnome-session-quit")
        Gtk.main_quit()
    
    def onPower(self, powerButton):
        os.system("shutdown now")
        Gtk.main_quit()

    def onRestart(self, restartButton):
        os.system("shutdown -r now")
        Gtk.main_quit()

    def onSettings(self, settingsButton):
        os.system("gnome-control-center user-accounts &")
        Gtk.main_quit()

    def onBluetooth(self, bluetoothSwitch):
        if bluetoothSwitch.get_active():
            os.system("rfkill unblock bluetooth")
        else:
            os.system("rfkill block bluetooth")

    def onSettingsWifi(self, settingsButtonWifi):
        os.system("gnome-control-center network &")
        Gtk.main_quit()
    
    def onSettingsDND(self, settingsButtonDND):
        os.system("gnome-control-center notifications &")
        Gtk.main_quit()

    def onSettingsBluetooth(self, settingsButtonBluetooth):
        os.system("gnome-control-center bluetooth &")
        Gtk.main_quit()
    
    def __init__(self):
        window1.connect('delete-event', self.onDestroy)
        window2.connect('delete-event', self.onDestroy)
        window3.connect('delete-event', self.onDestroy)
def reloadProfile():
    user = os.getlogin()
    convert = ("/var/lib/AccountsService/icons/",user)
    convert1 = ''.join(convert)
    pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale(filename = convert1, width = 75, height = 75, preserve_aspect_ratio=False)
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, pixbuf.get_width(), pixbuf.get_height())
    context = cairo.Context(surface)

    Gdk.cairo_set_source_pixbuf(context, pixbuf, 0, 0)

    context.arc(35, 35, 33, 0, 2*math.pi)
    context.clip()
    context.paint()
    context.set_source_rgba(255, 255, 255, 1)
    context.set_line_width(3)
    context.arc(35, 35, 33, 0, 2*math.pi)
    context.stroke()


    profilePicture.set_from_surface(surface)
    def usernameGet():
        if os.getlogin() == "username":
            return "please go fill in the usernameGet() function in powermenu.py with your own username for extra customization"
        else:
            return os.getlogin()
    profileLabel.set_label(usernameGet())

reloadProfile()
builder.connect_signals(Handler())   
window1.show_all()
window2.show_all()
window3.show_all()
window1.present()
window2.present()
window3.present()
window1.set_wmclass("powermenu_window1", "popup")
window2.set_wmclass("powermenu_window2", "popup")
window3.set_wmclass("powermenu_window3", "popup")
mouse_x, mouse_y = pyautogui.position()
if mouse_x < 1920:
    window1.move(1640,40)
else:
    window1.move(3560,40)
if mouse_x < 1920:
    window2.move(1572,280)
else:
    window2.move(3492,280)
if mouse_x < 1920:
    window3.move(1572,40)
else:
    window3.move(3492,40)
Gtk.main()
