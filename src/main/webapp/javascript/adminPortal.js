$(function() {

	// LOAD ALL USER CHARACTERS
	getUserComments = function() {
		$.ajax({
			method : "GET",
			url : "getAllCommentsTwo"
		}).done(
				function(response) {
					console.log(response.content);
					for (var i = 0; i < response.content.length; i++) {
						var currentComment = response.content[i];
						renderComment(currentComment.id,
								currentComment.commenterName,
								currentComment.commenterEmail,
								currentComment.commenterComment);

					}

				}).fail(function(response) {
		})
	}

	// LOAD CHARACTER TEMPLATE
	var renderComment = function(id, commenterName, commenterEmail,
			commenterComment) {

		var $template = $('#comment-template-comment').html();
		$template = $($template);

		$template.find('.remove-comment').attr('id', id);
		$template.find('.commenter-name').text(commenterName);
		$template.find('.commenter-email').text(commenterEmail);
		$template.find('.commenter-comment').text(commenterComment);

		var $commentsList = $(".comments-list");
		$commentsList.append($template);
	}

	$("#submitNews").on("click", function() {

		var title = $("#newsTitle").val();
		var image = $("#newsImage").val();
		var text = $("#newsText").val();

		$.ajax({
			method : "POST",
			url : "postNews",
			data : {

				newsTitle : title,
				newsImage : image,
				newsText : text
			}
		}).done(function(response) {

			window.location = "/admin_portal";
		});
	})

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

	// DELETE CHARACTER BUTTON
	$(document).on('click', '.remove-comment', function() {
		$selectedCharacter = $(this).closest('.list-group-item');
	})

	// CANCEL MODAL CONFIRMATION
	$("#confirm-delete").on(
			"click",
			function() {

				var characterId = $selectedCharacter.find('.remove-comment')
						.attr('id');
				deleteCharacterById(characterId);
			})

	// DELETE CHARACTER
	deleteCharacterById = function(id) {

		console.log(id);
		$.ajax({
			method : "POST",
			url : "deleteComment",
			data : {
				id : id
			}
		}).done(function(response) {
			$selectedCharacter.remove();
			$('#confirmDeleteModal').modal('hide');

		}).fail(function(response) {
			console.log(response);
		})

	}

	updateCrystalsDaily = function() {
		$.ajax({
			method : "POST",
			url : "updateCrystalsDaily",
		}).done(function(response) {

		}).fail(function(response) {
			console.log(response);
		})
	}
	
	setAdminResources = function() {
		$.ajax({
			method : "POST",
			url : "setAdminResources",
		}).done(function(response) {

		});
	}
	
	setAdminResources();
	getUserComments();
	loadAdminData();
	updateCrystalsDaily();
})