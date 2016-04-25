/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //Iterates through the properties of the allFeeds array to make sure a URL is defined
        it('defines a url', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });



        //Iterates through the properties of the allFeeds array to make sure a name is defined
        it('defines a name', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The Menu', function () {
        //created variable "menu" to hold element information
        var menu = $('body').hasClass('menu-hidden');

        //Tests if the menu is hidden on page load
        it('checks if menu is hidden by default', function () {
            expect(menu).toEqual(true);
        });

        //Tests if when menu icon is clicked, if it appears and dissapears
        it('shows menu when clicked', function () {
            var icon = $('.menu-icon-link');
            icon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            icon.click();
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });

    });

    describe('Initiail Entries', function () {

        beforeEach(function (done) { //Loads feed before each spec is ran
            loadFeed(0, function () {
                done();
            });
        });

        //Tests to make sure there is an entry in each field
        it('has a single entry in the feed', function () {
            var entry = $('.entry');
            var entryLength = entry.length;
            expect(entryLength).toBeGreaterThan(0);
        });
    });



    describe('New Feed Selection', function () {

        //Defined Variables for use in following functions
        var startingEntry;
        var newEntry;

        //Before each spec empty the feed
        beforeEach(function (done) {
            $('.feed').empty();

            //Starts at first feed
            loadFeed(0, function () {
                startingEntry = $('.feed').find("h2").text();
                done();
            });

            //Switches to a different feed to test if content has changed

        });

        //Checks to make sure it loads the disired content when a new feed is chosen
        it('loads a new feed when content changes', function (done) {
            //Switches to a different feed to test if content has changed
            loadFeed(1, function () {
                newEntry = $('.feed').find("h2").text();
                expect(startingEntry).not.toEqual(newEntry);
                done();
            });
        });
    });
}());
