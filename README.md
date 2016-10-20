# Offline-first Public Transportation App

This app provides the Caltrain time schedule for every combination of departure station and arrival station.
If the user is using a browser compatible with the Service Worker API, the app's assets will be cached and 
then be completely accessible even with no internet connection. Online and "lie-fi" 
experiences are also improved by this networkless retrieval of cached assets.

Live site: [https://pacific-peak-98188.herokuapp.com/](https://pacific-peak-98188.herokuapp.com/)

![caltrain app](http://res.cloudinary.com/dkw0kkkgd/image/upload/v1476999831/Screen_Shot_2016-10-20_at_4.48.40_PM_m8ajzj.png)


### Local Setup
***

Clone this repo to your local machine by running `git clone https://github.com/fleemaja/offline_first_transport_app.git` in the terminal.
Navigate to the project root and do the following:


##### 1. install 3rd party code/dependencies
  * run `npm install` to create the necessary node_modules to run the app

##### 2. gulp build process
  * install the gulp command line interface (if it's not already) with `sudo npm install --global gulp-cli`
  * run `gulp` if you want to make any changes to scripts or stylesheets

##### 3. start the server
  * open a new terminal tab/window if you have gulp running
  * run `node server.js`
  * open `http://localhost:8080/` in a browser to use the web app