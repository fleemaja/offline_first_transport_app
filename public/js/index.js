function getStops(){var t=departureDropdown.val(),e=arrivalDropdown.val();$("#stops").html("");var a=stops.indexOf(t),o=stops.indexOf(e);if(o>-1&&a>-1){var r=o>a?"Southbound":"Northbound";if($("#service-direction").html("<h2>"+r+" Service</h2>"),a<o)for(var i=a+1;i<o;i++)$("#stops").append('<p><span class="stop-sign"><i class="fa fa-arrow-down"></i></span>'+stops[i]+"</p>");else for(var s=a-1;s>o;s--)$("#stops").append('<p><span class="stop-sign"><i class="fa fa-arrow-down"></i></span>'+stops[s]+"</p>")}}function getTimes(){var t=departureDropdown.val(),e=arrivalDropdown.val(),a=$(".nav-tabs .active").text(),o=stops.indexOf(t),r=stops.indexOf(e);r>-1&&o>-1&&$.ajax({type:"GET",dataType:"json",url:"https://fleemaja.github.io/data/stop_trips.json",success:function(o){$("#time-table").html("");for(var r,i=o[t],s=o[e],n=0;n<i.length;n++)for(var p=0;p<s.length;p++)i[n].trip_id.toString()===s[p].trip_id.toString()&&i[n].stop_sequence<s[p].stop_sequence&&i[n].trip_day===a&&(r="",r+="<tr>",r+="<td>"+getFormattedTime(i[n].stop_time)+"</td>",r+='<td><i class="fa fa-clock-o" aria-hidden="true"></i></td>',r+="<td>"+getFormattedTime(s[p].stop_time)+"</td>",r+="</tr>",$("#time-table").append(r))}})}function getFormattedTime(t){var e=t.split(":"),a=parseInt(e[0],10),o=(a+11)%12+1,r=a>11?"pm":"am",i=e[1];return o+":"+i+" "+r}var departureDropdown=$("#departure-station"),arrivalDropdown=$("#arrival-station"),stops=[];"serviceWorker"in navigator&&navigator.serviceWorker.register("/serviceWorker.js",{scope:"/"}).then(function(t){t.installing?console.log("Service worker installing"):t.waiting?console.log("Service worker waiting"):t.active&&console.log("Service worker active")}).catch(function(t){console.log("Service worker registration failed: "+t)}),$(document).ready(function(){switch($.ajax({type:"GET",dataType:"json",url:"https://fleemaja.github.io/data/stop_list.json",success:function(t){t.forEach(function(t){departureDropdown.append("<option>"+t.stop_name+"</option>"),arrivalDropdown.append("<option>"+t.stop_name+"</option>"),stops.push(t.stop_name)})}}),(new Date).getDay()){case 0:$("#sunday").addClass("active");break;case 6:$("#saturday").addClass("active");break;default:$("#weekday").addClass("active")}}),departureDropdown.change(function(){var t=departureDropdown.val();getStops(),getTimes(),arrivalDropdown.children("option").each(function(){this.text===t?$(this).attr("disabled","disabled"):$(this).removeAttr("disabled")})}),arrivalDropdown.change(function(){var t=arrivalDropdown.val();getStops(),getTimes(),departureDropdown.children("option").each(function(){this.text===t?$(this).attr("disabled","disabled"):$(this).removeAttr("disabled")})}),$(".nav-tabs li").click(function(){$(".nav-tabs li").removeClass("active"),$(this).addClass("active"),getTimes()});