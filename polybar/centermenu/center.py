#this is where you import libraries
#make sure you have everything here installed, or else it won't work
import gi
import os
import pyautogui
import subprocess
import dbus
import cairo
import math
from time import sleep
from datetime import date
from datetime import datetime

gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, GdkPixbuf, Gdk

cwd0 = __file__
size0 = len(cwd0)
cwd1 = cwd0[:size0 - 9]

def fileToList(location):
        with open(location) as file:
            lines = [line.strip() for line in file]
        return lines

def stringToList(string):
    listRes = list(string.split(" "))
    return listRes

def cwdReturn(string):
    # this returns the current working directory for the program
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
    #i'm not really sure where this was used but removing it makes the program break so you probably shouldn't remove it
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
gpu_raw = subprocess.run(["bash", cwdReturn("gputemp.sh")], capture_output=True, text=True)


#there probably is a solution to make this smaller but i'm lazy
builder = Gtk.Builder()
builder.add_from_file(cwdReturn('ui/main.glade'))

window = builder.get_object("window1")
window2 = builder.get_object("window2")
window3 = builder.get_object("window3")
window4 = builder.get_object("window4")

mainCalendar = builder.get_object("mainCalendar")
clearButtonCalendar = builder.get_object("clearButtonCalendar")
returnButtonCalendar = builder.get_object("returnButtonCalendar")
timeLabel = builder.get_object("timeLabel")
dateLabel = builder.get_object("dateLabel")
musicTitle = builder.get_object("musicTitle")
musicArtist = builder.get_object("musicArtist")
musicPlayPause = builder.get_object("musicPlayPause")
musicPlayPauseIcon = builder.get_object("musicPlayPauseIcon")
musicCover = builder.get_object("musicCover")
filechooser = builder.get_object("filechooser")
cputemp = builder.get_object("cputemp")
gputemp = builder.get_object("gputemp")

def reCenterDate():
    #this code makes sure that the date on the calendar is the right day
            today = date.today()
            current_day = int(today.strftime("%d"))
            current_month = int(today.strftime("%m"))
            current_year = int(today.strftime("%Y"))
            current_month_alt = current_month - 1
            mainCalendar.select_day(current_day)
            mainCalendar.select_month(current_month_alt, current_year)
            
reCenterDate()

class Handler:
    #this is the main handler, basically it makes the buttons do things. (edit as necessary)
    def onSelectFile(self, filechooser, function, idk):
        location = filechooser.get_location()
        uri = location.get_uri()
        subprocess.run(["nautilus", uri])
        Gtk.main_quit()

    def onDestroy(self, *args):
        Gtk.main_quit()

    def settingsButtonOnClicked(self, settingsButton, function):
        subprocess.run(["gnome-control-center"])

    def daySelected(self, mainCalendar):
        date_year, date_month, date_day = mainCalendar.get_date()
        date_day_str = str(date_day)
        calendarBoolMarked = mainCalendar.get_day_is_marked(date_day)
        if calendarBoolMarked == 1:
            mainCalendar.unmark_day(date_day)
            removeFromFile((date_day_str), "storage/markedDates")
        elif calendarBoolMarked == 0:
            mainCalendar.mark_day(date_day)
            writeToFile((date_day_str), "storage/markedDates")
    
    def clearCalendar(self, mainCalendar):
        mainCalendar.clear_marks()
        open(cwdReturn("storage/markedDates"), "w").close()
    
    def playPauseOnClicked(self, playPauseButton):
        os.system("playerctl play-pause")
        refreshMusicLabel()
    
    def skipButtonOnClicked(self, skipButton):
        #fix this code being buggy on slower machines or when lagging
        #basically just get it to run asynchronously without screwing up the handler           
        # also it is ugly and slow when skipping
        os.system("playerctl next")
        sleep(1)
        refreshMusicLabel()
    
    def prevButtonOnClicked(self, prevButton):
        #fix this code being buggy on slower machines or when lagging
        #basically just get it to run asynchronously without screwing up the handler        
        # also it is ugly and slow when skipping
        os.system("playerctl previous")
        sleep(1)
        refreshMusicLabel()

#IMPORTANT!!!!!    
#the code below makes all of the buttons work
builder.connect_signals(Handler())   
window.show_all()
window2.show_all()
window3.show_all()
window4.show_all()
window.present()
window2.present()
window3.present()
window4.present()
window.set_wmclass("center_window0", "popup")
window2.set_wmclass("center_window2", "popup")
window3.set_wmclass("center_window3", "popup")
window3.set_wmclass("center_window4", "popup")

#don't remove this, just edit screen positions.
#todo: find an inclusive solution for this that works on all screens
mouse_x, mouse_y = pyautogui.position()
position1ax = (740)
position1ay = (70)

position2ax = (740)
position2ay = (284)

position3ax = (1003)
position3ay = (70)

position4ax = (740)
position4ay = (40)

#calculates the location of the window if it was on the 2nd screen
position1bx = (position1ax + 1920)
position2bx = (position2ax + 1920)
position3bx = (position3ax + 1920)
position4bx = (position4ax + 1920)

if mouse_x < 1920:
    window.move(position1ax,position1ay)
else:
    window.move(position1bx,position1ay)
if mouse_x < 1920:
    window2.move(position2ax,position2ay)
else:
    window2.move(position2bx,position2ay)
if mouse_x < 1920:
    window3.move(position3ax,position3ay)
else:
    window3.move(position3bx,position3ay)
if mouse_x < 1920:
    window4.move(position4ax,position4ay)
else:
    window4.move(position4bx,position4ay)

def setSystemInfo():
    #this gets the current cpu temp from /sys/class/thermal, divides it by 1000, converts it into a string, and then adds the text as necessary
    cputemp.set_label(''.join((str(list(map(int, fileToList("/sys/class/thermal/thermal_zone0/temp")))[0] / 1000), "°C")))
    gputemp.set_label(''.join((str(float(gpu_raw.stdout.rstrip('\n'))), "°C")))

def calendarMarkFromFile():
    #this code is the init for the calendar (basically makes sure that all the marked dates are correct)  
    lines = [x for x in fileToList(cwdReturn("storage/markedDates")) if x.strip()]
    counterTemp = 0
    for i, v in enumerate(lines):
        counterTemp + 1
        mainCalendar.mark_day(int(v))

calendarMarkFromFile()
setSystemInfo()
def setTimeDateOnLabel():
    #this code returns time and date
    now = datetime.now()
    time_string = now.strftime("%H:%M %p")
    date_string = now.strftime("%A, %b %d")
    timeLabel.set_text(time_string)
    dateLabel.set_text(date_string)
def refreshMusicLabel():
    def getMusicStatus(type):
        #this code gets the music metadata from dbus and returns whatever part of the metadata you specified
        bus = dbus.SessionBus()
        for service in bus.list_names():
            if service.startswith('org.mpris.MediaPlayer2.'):
                player = dbus.SessionBus().get_object(service, '/org/mpris/MediaPlayer2')
                status = player.Get('org.mpris.MediaPlayer2.Player', 'PlaybackStatus', dbus_interface='org.freedesktop.DBus.Properties')
                metadata = player.Get('org.mpris.MediaPlayer2.Player', 'Metadata', dbus_interface='org.freedesktop.DBus.Properties')
                print(metadata)
                if type == "cover":
                    try:
                        metadata[dbus.String('mpris:artUrl')]
                    except:
                        return("none")
                    else:
                        return(metadata[dbus.String('mpris:artUrl')])

                elif type == "title":
                    try: 
                        metadata[dbus.String('xesam:title')]
                    except:
                        return("- -")
                    else:
                        return(metadata[dbus.String('xesam:title')])
                
                elif type == "status":
                    return(status)

                elif type == "artist":
                    try:
                        metadata[dbus.String('xesam:artist')]
                    except:
                        return("No Artist")
                    else:
                        artist1 = str(metadata[dbus.String('xesam:artist')])
                        return(artist1[25: - 52])
    #this code truncates the overly long track titles and artists        
    uncomb1 = (str(getMusicStatus("title"))[:14] + (str(getMusicStatus("title"))[14:] and '..'))
    line1 = ''.join(uncomb1)
    uncomb2 = (str(getMusicStatus("artist"))[:14] + (str(getMusicStatus("artist"))[14:] and '..'))
    line2 = ''.join(uncomb2)
    musicTitle.set_text(line1)
    musicArtist.set_text(line2)
    #this code returns music player status and projects it to the icon
    try:
        subprocess.check_output(["playerctl", "status"])
    except: 
        playPauseStatus = "Stopped"
    else:
        playPauseStatus = subprocess.check_output(["playerctl", "status"])
    if playPauseStatus == b'Paused\n':
        musicPlayPauseIcon.set_from_icon_name("media-playback-start", 28)
    elif playPauseStatus == b'Playing\n':
        musicPlayPauseIcon.set_from_icon_name("media-playback-pause", 28)
    else:
        musicPlayPauseIcon.set_from_icon_name("media-playback-stop", 28)

    def reloadCover():
        #this code takes the cover image from the music player, draws a line around it and rounds it and then projects it.
        coverFile = str(getMusicStatus("cover"))[7:]
        if coverFile == "":
            print("nothing currently playing.")
        else:
            pixbuf = GdkPixbuf.Pixbuf.new_from_file_at_scale(filename = coverFile, width = 55, height = 55, preserve_aspect_ratio=False)
            surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, pixbuf.get_width(), pixbuf.get_height())
            context = cairo.Context(surface)

            Gdk.cairo_set_source_pixbuf(context, pixbuf, 0, 0)

            context.arc(27, 27, 25, 0, 2*math.pi)
            context.clip()
            context.paint()
            context.set_source_rgba(255, 255, 255, 1)
            context.set_line_width(2)
            context.arc(27, 27, 25, 0, 2*math.pi)
            context.stroke()

            musicCover.set_from_surface(surface)
    reloadCover()
refreshMusicLabel()
setTimeDateOnLabel()
#IMPORTANT!!!!!
Gtk.main()
