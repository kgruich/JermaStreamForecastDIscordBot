# JermaStreamForecastDIscordBot

## WORK IN PROGRESS ##

### Future Fixes (in order from most important to least) ###
 - Integrate Twitch API so the stream start times are more accurate, instead of relying on discord mods
   - not done since I barely know how to work the discord API, let alone Twitch's
 - Add parsing functionality for days, so that the bot can tell if Jerma is supposed to start at 1 pm today or 1 pm tomorrow
   - not done since this would add a decent amount of dev time, I also need more samples to test against, also counting whole day delays as being "late" may be exaggerated, maybe i'll add a seperate counter for it of postponements or the normal counter + postpone time
 - Add parsing funcionality for double digit hours
   - not done since i just straight forgot they existed, it would take a couple more layers of if else, not too much effort, but low priority since Jerma doesn't often stream then
 - Add partsing functionality for exact minutes
   - not done since expected times never have exact minues (if they have minutes at all), right now I just find the 0 to determine the start of the time, but I would have to change it a good bit to add this, it would just be nice functionality, but would be practically useless

### Future Additions (in order from most important to least) ###
 - none yet
