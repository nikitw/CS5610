/**
 * Created by nikit on 3/22/15.
 */
var editTop;
$(document).on('click', '.glyphicon-pencil', function(e){
    editTop = $(this).closest('.artist-block').position().top;
    smoothScroll(0, "slow");
});
$(document).on('click', '.cancel', function(e){
    editTop = null;
    smoothScroll(0, "slow");
});
$(document).on('submit', '#add-edit-artist', function(e){
    if(editTop)
        smoothScroll(editTop-300, "slow");
    editTop = null;
});
