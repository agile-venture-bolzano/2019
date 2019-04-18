$(function() {

    var activeSpeakers = {};

    //sessionize Json handling new version
    // $.getJSON('https://sessionize.com/api/v2/zo80faqt/view/all',function(data){
    $.getJSON('/assets/json/all.json',function(data){
        $.each(data.speakers,function(i,item){
            var key = item.id;
            activeSpeakers[key] = item;
        });

        afterActiveSpeakerPopulatedCallback();

        //this echoes all sessions modals

        var sessionizeModalHtml = '<div class="sessionize-modal-inner">';

        $.each(data.sessions,function(i,item){
            var formattedDateStarts = new Date(item.startsAt);
            var hStart = formattedDateStarts.getHours();
            var mStart = ('0'+formattedDateStarts.getMinutes()).slice(-2);
            var formattedDateEnds = new Date(item.endsAt);
            var hEnd = formattedDateEnds.getHours();
            var mEnd = ('0'+formattedDateEnds.getMinutes()).slice(-2);
            sessionizeModalHtml += '<div class="modal fade" id="exampleModal'+item.id+'" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
            sessionizeModalHtml += '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header">';
            sessionizeModalHtml += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            sessionizeModalHtml += '</div>';
            sessionizeModalHtml += '<div class="modal-body"><div class="left-modal">';
            if (item.speakers.length > 0) {
                sessionizeModalHtml += '<div class="modal-speaker-img-container">';
                for(var i=0; i<item.speakers.length; i++){
                    sessionizeModalHtml += '<figure class="modal-speaker-img">';
                    sessionizeModalHtml += '<img src="'+activeSpeakers[item.speakers[i]].profilePicture+'">';
                    sessionizeModalHtml += '</figure>';
                }
                sessionizeModalHtml += '</div>';
            }
            sessionizeModalHtml += '</div>';

            sessionizeModalHtml += '<div class="right-modal">';

            if(item.speakers.length > 0) {
                sessionizeModalHtml += '<div class="modal-speaker-name-container">';
                for(var i=0; i<item.speakers.length; i++){
                    sessionizeModalHtml += '<span class="colus modal-speaker-name">'+activeSpeakers[item.speakers[i]].fullName+'</span>';
                    if(i<(item.speakers.length-1)){
                       sessionizeModalHtml += ' - ';
                    }
                }
                sessionizeModalHtml += '</div>';
            }

            sessionizeModalHtml += '<h3 class="modal-session-name">'+item.title+'</h3>';

            sessionizeModalHtml += '<span class="modal-session-hour">'+hStart+':'+mStart+' - '+hEnd+':'+mEnd+'</span>';

            sessionizeModalHtml += '<div class="modal-session-text">'+item.description+'</div>';

            sessionizeModalHtml += '</div>';

            sessionizeModalHtml += '</div>';
            sessionizeModalHtml += '</div></div>';
            sessionizeModalHtml += '</div>';
        });
        sessionizeModalHtml += '</div>';
        $('#sessionizeModal').html(sessionizeModalHtml);

    }).error(function(){
        console.log('error');
    });

    var greenRoomImgUrl = 'assets/images/green-room.png';
    var yellowRoomImgUrl = 'assets/images/yellow-room.png';

    //sessionize Json handling new version
    var afterActiveSpeakerPopulatedCallback = function() {
        $.getJSON('/assets/json/gridtable.json', function(data){
            var sessionizeHtml = '<div class="sessionize-table" id="events"><div class="sessionize-table-inner"><div class="sessionize-table-body">';
            sessionizeHtml += '<div class="sessionize-table-row heading">';
            sessionizeHtml += '<div class="sessionize-table-cell">&nbsp;</div>';
            //this echoes all rooms
            $.each(data[0].rooms,function(i,item){

                sessionizeHtml += '<div class="sessionize-table-cell">';
                sessionizeHtml += '<div class="green-room sessionize-rooms">';
                if (i == 0) {
                    sessionizeHtml += '<img src="'+ greenRoomImgUrl + '">';
                }
                else {
                    sessionizeHtml += '<img src="'+ yellowRoomImgUrl + '">';
                }
                sessionizeHtml += '<span class="sessionize-room-description text-uppercase colus">'+item.name+'</span>';
                sessionizeHtml += '</div>';
                sessionizeHtml += '</div>';
            });
            sessionizeHtml += '</div>';

            //this echoes timeSlots
            $.each(data[0].timeSlots,function(index,item){
                sessionizeHtml += '<div class="sessionize-table-row content">';
                sessionizeHtml += '<div class="sessionize-table-cell"><span class="sessionize-main-hour">'+item.slotStart.slice(0,5)+'</span></div>';

                //this echoes timeSlots
                $.each(item.rooms, function(i,item){
                    var formattedDateStarts = new Date(item.session.startsAt);
                    var hStart = formattedDateStarts.getHours();
                    var mStart = ('0'+formattedDateStarts.getMinutes()).slice(-2);
                    var formattedDateEnds = new Date(item.session.endsAt);
                    var hEnd = formattedDateEnds.getHours();
                    var mEnd = ('0'+formattedDateEnds.getMinutes()).slice(-2);
                    
                    var roomClass = item.name.toLowerCase();
                    roomClass = roomClass.trim();

                    if(['117777', '117049', '114958'].includes(item.session.id)) {
                        sessionizeHtml += '<div class="sessionize-table-cell empty-cell"><div class="sessionize-table-event"></div></div>';
                    }
                    
                    
                    if(item.session.speakers.length == 0){
                        sessionizeHtml += '<div class="sessionize-table-cell break-event">';
                    }else{
                         sessionizeHtml += '<div class="sessionize-table-cell">';
                    }
                    
                    var multipleSlotClass = '';                    
                    if(index < (data[0].timeSlots.length-1)){
                        var nextSlotStart = new Date('1/1/2011 '+data[0].timeSlots[index+1].slotStart);
                        var nextSlotStartTimeStamp = nextSlotStart.getTime();
                        var itemEndTime = new Date('1/1/2011 '+hEnd + ':' +mEnd + ':00');
                        var itemEndTimeTimeStamp = itemEndTime.getTime();
                        if(itemEndTime>nextSlotStart){
                            multipleSlotClass = 'overflowd';
                        }
                    }
                    
                    sessionizeHtml += '<div class="sessionize-table-event '+roomClass+'-room '+multipleSlotClass+'">';

                    sessionizeHtml += '<div class="sessionize-mobile-room d-flex align-items-center d-md-none mb-3">';
                    if(item.id == 5147) {
                        sessionizeHtml += '<span class="sessionize-mobile-roomimg"><img width="37" height="22" src="assets/images/green-room.png"></span><span class="sessionize-room-description text-uppercase colus pl-2">'+item.name+'</span>';
                    } else {
                        sessionizeHtml += '<span class="sessionize-mobile-roomimg"><img width="37" height="22" src="assets/images/yellow-room.png"></span><span class="sessionize-room-description text-uppercase colus pl-2">'+item.name+'</span>';
                    }

                    sessionizeHtml += '</div>';

                    sessionizeHtml += '<a href="#exampleModal'+item.session.id+'" data-toggle="modal" class="sessionize-event-link js-event-link"><span class="sessionize-event-hour">'+hStart+':'+mStart+' - '+hEnd+':'+mEnd+'</span>';

                    $.each(item.session.speakers,function(i,item){
                        sessionizeHtml += '<span class="sessionize-event-speaker js-speaker-link">'+activeSpeakers[item.id].fullName+'</span>';
                    });

                    sessionizeHtml += '<span class="sessionize-event-title"><span>'+item.session.title+'</span></span></a>';

                    sessionizeHtml += '</div></div>';
                });
                sessionizeHtml += '</div>';
            });
            
            
            // ultima ora (fine della conferenza)
            sessionizeHtml += '<div class="sessionize-table-row content">';
            var finishingHourEnds = new Date(data[0].timeSlots[data[0].timeSlots.length-1].rooms[0].session.endsAt);
            var finishingHourhEnd = finishingHourEnds.getHours();
            var finishingHourmEnd = ('0'+finishingHourEnds.getMinutes()).slice(-2);
            sessionizeHtml += '<div class="sessionize-table-cell"><span class="sessionize-main-hour">'+finishingHourhEnd+':'+finishingHourmEnd+'</span></div>';
            sessionizeHtml += '</div>';


            sessionizeHtml += '</div></div></div>';
            sessionizeHtml += '<button data-target="#events" class="d-md-none btn btn-link js-show-more"><i class="ico ico-plus"></i>See more</button>';
            $('#sessionizeDataJson').html(sessionizeHtml);


        }).error(function(){
            console.log('error');
        });
    }
})