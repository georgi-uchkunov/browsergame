$(function() {

	$("#createMission").on("click", function() {

		var title = $("#title").val();
		var image = $("#image").val();
		var difficulty = $("#difficulty").val();
		var description = $("#description").val();
		var statOne = $("#statOne").val();
		var statTwo = $("#statTwo").val();
		var skillOne = $("#skillOne").val();
		var skillTwo = $("#skillTwo").val();
		var missionTime = $("#missionTime").val();
		var crystalCost = $("#crystalCost").val();
		var rewardGold = $("#rewardGold").val();
		var rewardGuildPoints = $("#rewardGuildPoints").val();

		$.ajax({
			method : "POST",
			url : "createMission",
			data : {

				title : title,
				crystalCost : crystalCost,
				rewardGold : rewardGold,
				rewardGuildPoints : rewardGuildPoints,
				description : description,
				missionTime : missionTime,
				statOne : statOne,
				statTwo : statTwo,
				skillOne : skillOne,
				skillTwo : skillTwo,
				difficulty : difficulty,
				image : image
			}
		}).done(function(response) {

			window.location = "/mission_creator";
		});
	})

	getMissions = function() {
		$.ajax({
			method : "GET",
			url : "getAllMissions"
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentMission = response.content[i];
						renderMission(currentMission.id, currentMission.title,
								currentMission.description,
								currentMission.difficulty,
								currentMission.image,
								currentMission.crystalCost,
								currentMission.rewardGold,
								currentMission.rewardGuildPoints,
								currentMission.missionTime,
								currentMission.statOne, currentMission.statTwo,
								currentMission.skillOne,
								currentMission.skillTwo);

					}

				}).fail(function(response) {
		})
	}

	var renderMission = function(id, title, description, difficulty, image,
			crystalCost, rewardGold, rewardGuildPoints, missionTime, statOne,
			statTwo, skillOne, skillTwo) {

		var $template = $('#template-mission').html();
		$template = $($template);

		$template.find('.remove-mission').attr('id', id);
		$template.find('.edit-mission').attr('id', id);
		$template.find('.mission-title').text(title);
		$template.find('.mission-image').attr('src', image);
		$template.find('.mission-image').val(image);
		$template.find('.mission-difficulty').text(difficulty);
		$template.find('.mission-crystal-cost').text(crystalCost);
		$template.find('.mission-gold-reward').text(rewardGold);
		$template.find('.mission-guild-points-reward').text(rewardGuildPoints);
		$template.find('.mission-description').text(description);
		$template.find('.mission-stat-one').text(statOne);
		$template.find('.mission-stat-two').text(statTwo);
		$template.find('.mission-skill-one').text(skillOne);
		$template.find('.mission-skill-two').text(skillTwo);

		if (missionTime == 300) {
			$template.find('.mission-time').text('5 min');
		}
		if (missionTime == 900) {
			$template.find('.mission-time').text('15 min');
		}
		if (missionTime == 1800) {
			$template.find('.mission-time').text('30 min');
		}
		if (missionTime == 3600) {
			$template.find('.mission-time').text('1 hour');
		}
		if (missionTime == 5200) {
			$template.find('.mission-time').text('2 hours');
		}

		var $missionList = $('#mission-list');
		$missionList.append($template);
	}

	$('.modal.draggable>.modal-dialog').draggable({
		cursor : 'move',
		handle : '.modal-header'
	});

	$('.modal.draggable>.modal-dialog>.modal-content>.modal-header').css(
			'cursor', 'move');

	$(document).on('click', '.remove-mission', function() {
		$selectedMission = $(this).closest('.list-group-item');
		var missionId = $selectedMission.find('.remove-mission').attr('id');
		$('#missionIdPassModal').find('#missionId').val(missionId);
	})

	$('#confirm-delete-mission').on("click", function() {
		var missionId = $('#missionId').val();
		deleteMissionById(missionId);
	})

	$(document).on(
			'click',
			'.list-group-item',
			function() {
				$selectedMission = $(this).closest(
						'.list-group-template-mission');
				$trueSelectedMission = $selectedMission.prevObject;
				var display = $trueSelectedMission.find('.remove-mission').css(
						'display');
				if (display == 'block') {
					$trueSelectedMission.find('.stats-col').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedMission.find('.edit-mission').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedMission.find('.remove-mission').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedMission.find('.image-col').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedMission.find('.description-col').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					setTimeout(function() {
						$trueSelectedMission.find('.image-col').css({
							'opacity' : '1'
						});
					}, 110);
					setTimeout(function() {
						$trueSelectedMission.find('.description-col').css({
							'opacity' : '1'
						});
					}, 110);

				} else {
					$trueSelectedMission.find('.stats-col').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedMission.find('.edit-mission').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedMission.find('.remove-mission').css({
						'display' : 'block',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});
					$trueSelectedMission.find('.image-col').css({
						'display' : 'none',
						'opacity' : '0',
						'transition' : 'opacity 1s ease-out',
						'transition-delay' : '250ms'
					});

					setTimeout(function() {
						$trueSelectedMission.find('.stats-col').css({
							'opacity' : '1'
						});
					}, 110);
					setTimeout(function() {
						$trueSelectedMission.find('.edit-mission').css({
							'opacity' : '1'
						});
					}, 110);
					setTimeout(function() {
						$trueSelectedMission.find('.remove-mission').css({
							'opacity' : '1'
						});
					}, 110);
				}
			});

	deleteMissionById = function(id) {

		console.log(id);
		$.ajax({
			method : "POST",
			url : "deleteMission",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedMission.remove();
			$('#confirmDeleteMissionModal').modal('hide');
			window.location = "/mission_creator";

		}).fail(function(response) {
			console.log(response);
		})

	}

	var loadAdminData = function() {
		$.ajax({
			method : "GET",
			url : "getCurrentUser"
		}).done(function(response) {
			if (response.email != "admin@admin.com") {
				window.location = "/";
				return;
			}
		});
	}

	setAdminResources = function() {
		$.ajax({
			method : "POST",
			url : "setAdminResources",
		}).done(function(response) {

		});
	}

	setAdminResources();
	getMissions();
	loadAdminData();
})