$(window).resize(function()
{
    reAppendModules();
});

$(document).ready(function()
{
    var windowHeight = $(window).height();
    
    // make right modules expendables
    //slideUpModules();
    
    reOrganizeTemplates()



    $( '.userMenu-home.current a' ).on( 'click', function() {
        $('html, body').animate({scrollTop:0},300);
        return false
    });

    // modify the way promoted posts are shown
    $( ".promoted-posts-only").click(function() {
        //active promoted posts tab
        $(this).children('.promoted-posts').addClass(promotedPostsOnly ? "active" : "disabled");
        $(this).children('.normal-posts').addClass(promotedPostsOnly ? "disabled" : "active");
        $('#postboard-top').removeClass(promotedPostsOnly ? "show" : "hide");
        //active normal posts
        $(this).children('.promoted-posts').removeClass(promotedPostsOnly ? "disabled" : "active");
        $(this).children('.normal-posts').removeClass(promotedPostsOnly ? "active" : "disabled");
        $('#postboard-top').addClass(promotedPostsOnly ? "hide" : "show");
    });

    $(".userMenu-search-profiles .follow")
        .on("eventToggleFollow", function() {
            $(this).text('+').attr('title', polyglot.t('Follow'));
        })
        .on("eventToggleUnfollow", function() {
            $(this).text('-').attr('title', polyglot.t('Unfollow'));
        });

    if (/\/options.html$/i.test(document.location))
        $(document).ready(localizeLabels);

    $(window).scroll(function(){
        window_scrollY = window.pageYOffset; // declare variable here for screen not to scroll when closing modals
    });
       /*
    $(window).scroll(function(){
        window_scrollY = window.pageYOffset; // declare variable here for screen not to scroll when closing modals

        if ($(document).scrollTop() >= 142) { // fixe the textarea on top while scrolling (could be useful)
            if (this.css('position') === 'relative')
                this.addClass('onTop'); 
        }else if (this.css('position') === 'fixed')
            this.removeClass('onTop'); 
    }).bind($('#postboard-top')));*/
});


function slideUpModules() {

    $(document).on( 'click', 'h3', function() {
        var thisList = $(this).parents('.module').find('ol');
        var thisListTitle = $(this).parents('.module').find('h4');
        if (thisList.css('display') === 'none') {thisList.slideDown();thisListTitle.slideDown()}
        else {thisList.slideUp();thisListTitle.slideUp()}
    });
}



function reOrganizeTemplates() { // for nin's templating

    reAppendModules();

    //removes unused html
    $('.modal-close').html('');
    $('.modal-back').html('');
    $('.twister-user-remove').html('');
    $('.profile-card-main').attr('style', '');
    $('.userMenu-search-profiles button').html('+').attr('title',polyglot.t('Follow'));
    $('.mini-profile-actions span').html('');

    //re-organizes
    $('.promoted-posts-only').detach().appendTo($('.left .mini-profile'));
    $('.mini-profile .open-following-page').parent('li').detach().appendTo($('.mini-profile-indicators'));
    $('.mini-profile-indicators').detach().insertAfter($('.dashboard.left .profile-data'));
    $('.post-context').each(function(){ $(this).prependTo($(this).parent()); }); // puts context on top of post

    // menu 
    //$('.userMenu li > a').wrapInner('<span class="inner"></span>');

    ///// page profile 
    $('.profile-card-main h2').detach().insertBefore($('.profile-card-main'));

    //loader
    newLoader()
}

function reAppendModules() { // avoid w1200 things
    $('.module.toptrends').detach().appendTo($('.dashboard.right'));
    $('.module.who-to-follow').detach().appendTo($('.dashboard.right'));
    $('.module.twistday-reminder').detach().appendTo($('.dashboard.right'));
}


function newLoader() { // create divs for new loader
    $('<div></div>').appendTo('.postboard-loading');
    $('<div></div>').appendTo('.postboard-loading');
    $('<div></div>').appendTo('.postboard-loading');
}

function localizeLabels() {
    $("label[for=tab_language]").text(polyglot.t("Language"));
    $("label[for=t-2]").text(polyglot.t("Theme"));
    $("label[for=t-3]").text(polyglot.t("Notifications"));
    $("label[for=t-4]").text(polyglot.t("Keys"));
    $("label[for=t-5]").text(polyglot.t("Appearance"));
    $("label[for=t-6]").text(polyglot.t("Users"));
}

function openModal(modal) {
    
    var windowHeight = $(window).height();
    if (!modal.classBase)
        modal.classBase = '.modal-wrapper';

    $(modal.classBase + ':not(#templates *)').remove();

    modal.self = $('#templates ' + modal.classBase).clone(true)
        .addClass(modal.classAdd);

    if (modal.title)
        modal.self.find('.modal-header h3').html(modal.title);
    if (modal.content)
        modal.content = modal.self.find('.modal-content')
            .append(modal.content);
    else
        modal.content = modal.self.find('.modal-content');
        modal.postboard = modal.self.find('.postboard-posts');

        modal.self.prependTo('body').slideDown();
     

    if (modal.classBase === '.modal-wrapper') {
        modal.content.outerHeight(modal.self.height() - modal.self.find('.modal-header').outerHeight());

        if (modal.self.outerHeight() > windowHeight) {
            modal.content.outerHeight(modal.content.outerHeight() - modal.self.outerHeight() + windowHeight);
            modal.self.outerHeight(windowHeight);
            modal.self.css('margin-top', - windowHeight / 2);
        }

    }

    return modal;
}

