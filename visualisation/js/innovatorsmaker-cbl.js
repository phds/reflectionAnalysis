var selectedTeam;
var bigIdeaBeingEdited;

function getPersonality16Img(personality16) {
    var personalityPrefix = personality16.substring(0,4);
    return 'img/' + personalityPrefix + '.png';
}

function getPersonality16Info(personality16) {
    var res = {};
    switch(personality16) {
        case('none') : {
            break;
        }
        case('intj-a') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Architect';
            break;
        }
        case('intp-a') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Logician';
            break;
        }
        case('entj-a') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Commander';
            break;
        }
        case('entp-a') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Debater';
            break;
        }
        case('intj-t') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Architect';
            break;
        }
        case('intp-t') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Logician';
            break;
        }
        case('entj-t') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Commander';
            break;
        }
        case('entp-t') : {
            res['role'] = 'Analyst';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Debater';
            break;
        }

        case('infj-a') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Advocate';
            break;
        }
        case('infp-a') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Mediator';
            break;
        }
        case('enfj-a') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Protagonist';
            break;
        }
        case('enfp-a') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Campaigner';
            break;
        }
        case('infj-t') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Advocate';
            break;
        }
        case('infp-t') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Mediator';
            break;
        }
        case('enfj-t') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Protagonist';
            break;
        }
        case('enfp-t') : {
            res['role'] = 'Diplomat';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Campaigner';
            break;
        }

        case('istj-a') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Logistician';
            break;
        }
        case('isfj-a') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Defender';
            break;
        }
        case('estj-a') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Executive';
            break;
        }
        case('esfj-a') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Consul';
            break;
        }
        case('istj-t') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Logistician';
            break;
        }
        case('isfj-t') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Defender';
            break;
        }
        case('estj-t') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Executive';
            break;
        }
        case('esfj-t') : {
            res['role'] = 'Sentinel';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Consul';
            break;
        }

        case('istp-a') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Virtuoso';
            break;
        }
        case('isfp-a') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'Confident Individualism';
            res['personality'] = 'Adventurer';
            break;
        }
        case('estp-a') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Entrepreneur';
            break;
        }
        case('esfp-a') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'People Mastery';
            res['personality'] = 'Entertainer';
            break;
        }
        case('istp-t') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Virtuoso';
            break;
        }
        case('isfp-t') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'Constant Improvement';
            res['personality'] = 'Adventurer';
            break;
        }
        case('estp-t') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Entrepreneur';
            break;
        }
        case('esfp-t') : {
            res['role'] = 'Explorer';
            res['strategy'] = 'Social Engagement';
            res['personality'] = 'Entertainer';
            break;
        }
    }

    return res;            
}


function loadTimeline(student, cblClass) {
    // var studentTeams;
    var studentReflections;

    var Activity = Parse.Object.extend('Activity');
    var activityQuery = new Parse.Query(Activity);
    activityQuery.equalTo('cblClass', cblClass);
    activityQuery.include('newTeam.members');
    activityQuery.include('newTeam.cblCycle');
    activityQuery.include('statement.cblSprint');
    activityQuery.include('cblChallenge');
    activityQuery.include('bigIdea');
    activityQuery.equalTo('author', student);

    studentTimeline = [];

    var selectedActivity;

    var promise = new Parse.Promise.as();

    promise = promise.then(function(){
        return activityQuery.find().then(function(ts) {
            // studentTeams = ts;
            _.each(ts, function(activity) {
                var timelineItem = {'createdAt': activity.createdAt, 'reflection':null, 'activity':activity};
                studentTimeline.push(timelineItem);
                activitiesDict[activity.id] = activity;
            })                    
        })  
    })

    var Reflection = Parse.Object.extend('Reflection');
    var reflectionQuery = new Parse.Query(Reflection);
    reflectionQuery.equalTo('author', student);
    reflectionQuery.include('reflectionStatement.cblSprint');

    return promise = promise.then(function() {
        return reflectionQuery.find().then(function(reflections) {
            studentReflections = reflections;
            _.each(reflections, function(reflection) {
                reflectionsDict[reflection.id] = reflection;
                var timelineItem = {'createdAt': reflection.createdAt, 'reflection':reflection, 'team':null};
                studentTimeline.push(timelineItem);
            })
        })
    }).then(function() {
        studentTimeline = studentTimeline.sort(function(a, b){

            if (!a) {
                return 1;
            }

            a = a['createdAt'];
            b = b['createdAt'];

            if (a < b) {
                return 1;
            }else if (a > b) {
                return -1;
            }else {
                return 0;
            }
        });

        // displayTimeline(studentReflections, studentTeams);
        //displayTimeline(studentTimeline);
        return studentTimeline;
    })
}

function displayTimeline(studentTimeline) {
    var numDoneReflections = 0;
    var numPendingReflections = 0;
    var previousSprintId;
    
    $('.activities-timeline').empty();
    $pendingChallengeTimelineItem = $pendingChallengeTimelineItemRef.clone();
    $pendingChallengeTimelineItem.appendTo('.activities-timeline');

    _.each(studentTimeline, function(timelineItem) {
        var sprintId;

        var $activityTimelineItem = $('<div class="activity-timeline-item"></div>');

        if (timelineItem['reflection']) {
            var reflection = timelineItem['reflection'];
            var statement = reflection.get('reflectionStatement').get('text');

            var sprint = reflection.get('reflectionStatement').get('cblSprint');
            sprintId = sprint.id;

            if (sprintId != previousSprintId) {
                previousSprintId = sprintId;
                $sprintTimelineSeparator = $sprintTimelineSeparatorRef.clone();
                $sprintTimelineSeparator.find('.cbl-sprint-separator-name').text(sprint.get('name'));
                $sprintTimelineSeparator.appendTo('.activities-timeline');
            }

            if (reflection.get('isDone')) {
                if (!reflection.get('isVideo')) {
                    var $reflectionTimelineItem = $reflectionTimelineItemRef.clone();
                    var text = reflection.get('text');
                    $reflectionTimelineItem.find('.reflection-statement').text(statement);
                    $reflectionTimelineItem.find('.reflection-text').text(text);
                    $reflectionTimelineItem.removeClass('pending-reflection-timeline-item');
                    $reflectionTimelineItem.attr('reflection-id', reflection.id);
                    $reflectionTimelineItem.find('.new-reflection-buttons').remove();
                    $reflectionTimelineItem.appendTo($activityTimelineItem);
                }else {
                    var $videoReflectionTimelineItem = $videoReflectionTimelineItemRef.clone();
                    var link = reflection.get('text');
                    $videoReflectionTimelineItem.find('.reflection-statement').text(statement);
                    $videoReflectionTimelineItem.find('.video-reflection-link').attr('href', link);
                    $videoReflectionTimelineItem.find('.new-reflection-buttons').remove();
                    $videoReflectionTimelineItem.attr('reflection-id', reflection.id);
                    $videoReflectionTimelineItem.appendTo($activityTimelineItem);
                }

                numDoneReflections++;
            }else {
                var $reflectionTimelineItem = $reflectionTimelineItemRef.clone();
                $reflectionTimelineItem.find('.reflection-statement').text(statement);
                $reflectionTimelineItem.attr('reflection-id', reflection.id);
                $reflectionTimelineItem.find('.btn-edit-reflection').addClass('hide');
                $reflectionTimelineItem.appendTo($activityTimelineItem);
                numPendingReflections++;
            }

            $('.student-profile-num-done-reflections').text(numDoneReflections);
            $('.student-profile-num-pending-reflections').text(numPendingReflections);
        }else if(timelineItem['activity']) {
            var activity = timelineItem['activity'];
            var statement = activity.get('statement');

            var sprint = activity.get('statement').get('cblSprint');
            sprintId = sprint.id;

            if (sprintId != previousSprintId) {
                previousSprintId = sprintId;
                $sprintTimelineSeparator = $sprintTimelineSeparatorRef.clone();
                $sprintTimelineSeparator.find('.cbl-sprint-separator-name').text(sprint.get('name'));
                $sprintTimelineSeparator.appendTo('.activities-timeline');
            }

            if (statement.get('isNewTeam')) {
                var $teamTimelineItem = $teamTimelineItemRef.clone();
                var team = activity.get('newTeam');
                if (team) {
                    var teamName = team.get('name');

                    var sprint = team.get('cblSprint');
                    sprintId = sprint.id;

                    $teamTimelineItem.find('.team-name').text(teamName);
                    $teamTimelineItem.find('.challenge-name').text(team.get('cblCycle').get('name'));
                    $teamTimelineItem.attr('team-id', team.id);

                    var members = team.get('members');
                    _.each(members, function(member) {
                        var $teamMember = $teamMemberRef.clone();
                        if (member.get('photo')) {
                            $teamMember.find('.member-photo').attr('src', member.get('photo').url());
                        }
                        $teamMember.appendTo($teamTimelineItem.find('.team-members'));

                        var name = member.get('name');
                        var nameWords = name.split(' ');
                        var firstAndLastName = nameWords[0];
                        if (nameWords.length > 1) {
                            firstAndLastName += ' ' + nameWords[nameWords.length - 1];
                        }
                        $teamMember.find('.member-name').text(firstAndLastName);
                    })

                    var numMembersLastRow = members.length % 4;
                     if (numMembersLastRow > 0) {
                        var numEmptyMembers = 4 - numMembersLastRow;
                        for (var i = 0; i < numEmptyMembers; i++) {
                            var $teamMember = $teamMemberRef.clone();
                            $teamMember.empty();
                            $teamMember.appendTo($teamTimelineItem.find('.team-members'));
                        }                                
                     }
                    $teamTimelineItem.appendTo($activityTimelineItem);                        
                }else {
                    $pendingNewTeamTimelineItem = $pendingNewTeamTimelineItemRef.clone();
                    $pendingNewTeamTimelineItem.find('.activity-statement').text(activity.get('statement').get('text'));
                    $pendingNewTeamTimelineItem.attr('activity-id', activity.id);
                    $pendingNewTeamTimelineItem.appendTo($activityTimelineItem); 
                }
            }else if (statement.get('isBigIdea')) {
                if (!activity.get('isDone')) {
                    var $pendingBigIdeaTimelineItem = $pendingBigIdeaTimelineItemRef.clone();
                    $pendingBigIdeaTimelineItem.find('.activity-statement').text(activity.get('statement').get('text'));
                    $pendingBigIdeaTimelineItem.attr('activity-id', activity.id);
                    $pendingBigIdeaTimelineItem.attr('challenge-id', activity.get('statement').get('cblChallenge').id);
                    $pendingBigIdeaTimelineItem.attr('team-id', activity.get('newTeam').id);
                    $pendingBigIdeaTimelineItem.appendTo($activityTimelineItem); 
                }else {
                    var $bigIdeaTimelineItem = $bigIdeaTimelineItemRef.clone();
                    $bigIdeaTimelineItem.attr('big-idea-id', activity.get('bigIdea').id);
                    $bigIdeaTimelineItem.find('.big-idea-text').text(activity.get('bigIdea').get('text'));
                    $bigIdeaTimelineItem.find('.big-idea-image').attr('src', activity.get('bigIdea').get('imgFile').url());
                    $bigIdeaTimelineItem.find('.big-idea-img-file-link').attr('href', activity.get('bigIdea').get('imgFile').url());
                    $bigIdeaTimelineItem.find('.big-idea-pdf-file-link').attr('href', activity.get('bigIdea').get('pdfFile').url());
                    $bigIdeaTimelineItem.find('.big-idea-presentation-file-link').attr('href', activity.get('bigIdea').get('presentationFile').url());
                    $bigIdeaTimelineItem.find('.team-name').text(activity.get('newTeam').get('name'));
                    $bigIdeaTimelineItem.find('.challenge-name').text(activity.get('cblChallenge').get('name'));
                    $bigIdeaTimelineItem.appendTo($activityTimelineItem);
                }

            }
        }
        $activityTimelineItem.appendTo('.activities-timeline');

    })

    $('.btn-new-challenge').click(function() {
        localStorage.setItem('challenge-id', 'xOqRFfipEl');
    })

    $('.btn-new-big-idea').click(function() {
        var activityId = $(this).parents('.timeline-item').attr('activity-id');
        var Activity = Parse.Object.extend('Activity');

        var activityQuery = new Parse.Query(Activity);
        activityQuery.include('newTeam');
        activityQuery.get(activityId).then(function(activity) {
            selectedTeam = activity.get('newTeam');
            newBigIdea['team'] = selectedTeam;
            newBigIdea['challenge'] = selectedTeam.get('cblCycle');
            newBigIdea['text'] = '';
            newBigIdea['activity'] = activity;

            $('#new-big-idea-modal').modal('show');
        })
    })

    $('.btn-new-team').click(function() {
        var activityId = $(this).parents('.timeline-item').attr('activity-id');
        selectedActivity = activitiesDict[activityId];
    })

    $('.btn-new-text-reflection').click(function() {
        var statement = $(this).parents('.content').find('.reflection-statement').text();
        $('.modal-header').find('.reflection-statement').text(statement);
        currentReflectionId = $(this).parents( '.reflection-timeline-item').attr('reflection-id');
    })

    $('.btn-new-video-reflection').click(function() {
        var statement = $(this).parents('.content').find('.reflection-statement').text();
        $('.modal-header').find('.reflection-statement').text(statement);
        currentReflectionId = $(this).parents( '.reflection-timeline-item').attr('reflection-id');
    })                        

    $('.total-pending-reflections').text(numPendingReflections);
    $('.total-done-reflections').text(numDoneReflections);


    $('.btn-edit-big-idea').click(function() {
        var bigIdeaId = $(this).parents('.big-idea-item').attr('big-idea-id');
        var BigIdea = Parse.Object.extend('BigIdea');
        var query = new Parse.Query(BigIdea);
        query.get(bigIdeaId).then(function(bigIdea) {
            newBigIdea['text'] = bigIdea.get('text');
            newBigIdea['imgFile'] = bigIdea.get('imgFile');
            newBigIdea['pdfFile'] = bigIdea.get('pdfFile');
            newBigIdea['presentationFile'] = bigIdea.get('presentationFile');
            bigIdeaBeingEdited = bigIdea;
            $modal = $('#new-big-idea-modal');
            $('.input-big-idea-text').val(bigIdea.get('text'));
            $modal.find('.image-crop').find('img').attr('src', bigIdea.get('imgFile').url());
            $('#new-big-idea-modal').modal('show');
        })
    })

    $('.btn-edit-team').click(function() {
        var teamId = $(this).parents('.team-timeline-item').attr('team-id');
        var Team = Parse.Object.extend('Team');
        var teamQuery = new Parse.Query(Team);
        teamQuery.include('members');
        teamQuery.get(teamId).then(function(team) {
            selectedTeam = team;
            $('#new-team-modal').modal('show');
        })
    })

    $('.btn-edit-reflection').click(function() {
        var statement = $(this).parents('.content').find('.reflection-statement').text();
        currentReflectionId = $(this).parents( '.reflection-timeline-item').attr('reflection-id');
        $('.modal-header').find('.reflection-statement').text(statement);

        var reflection = reflectionsDict[currentReflectionId];

        if (!reflection.get('isVideo')) {
            $('.new-reflection-textarea').val(reflection.get('text'));
            $('#new-reflection-modal').modal('show');
        }else {
            $('.new-video-reflection-input').val(reflection.get('text'));
            $('#new-video-reflection-modal').modal('show');
        }

    });
}

