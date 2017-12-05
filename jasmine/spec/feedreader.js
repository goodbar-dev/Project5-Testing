/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have URLs', function() {
            allFeeds.forEach((feed) => {
              expect(feed.url).toBeDefined();
              expect(feed.url).not.toBe('');
            });
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have names', function() {
            allFeeds.forEach((feed) => {
              expect(feed.name).toBeDefined();
              expect(feed.name).not.toBe('');
            });
         });
    });


    /* Test suite named "The menu" */
    describe('The menu', function() {
      /* Test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('is hidden by default', function() {
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });

       /* Test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('changes visibility when clicked', function() {
          //test result of the first click
          $('.menu-icon-link').trigger("click");
          expect($('body').hasClass('menu-hidden')).toBe(false);

          //test result of the second click
          $('.menu-icon-link').trigger("click");
          expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //ensure there is at least one feed before proceeding
         it('has at least one feed', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length > 0).toBe(true);
         });

         //load the first feed
         beforeEach(function(done) {
           loadFeed(0, done);
         });

         //check if the currently selected feed has at least one article.
         it('has at least a single entry', function(done) {
           expect($('.feed').children().length > 0).toBe(true);
           done();
         });
    });


    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      /* Test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

       //ensure there is more than one feed before performing further tests.
       it('has more than 1 possible feeds', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length > 1).toBe(true);
       });

       let originalHeader = 'Start';

       //load first feed and capture header.
       beforeEach(function(done) {
         loadFeed(0, function() {
           originalHeader = $('.header').text();
           done();
         });
       });

       //load second feed.
       beforeEach(function(done) {
         loadFeed(1, function() {
           done();
         });
       });

       //check if the header captured originally differs from the current one.
       it('has new content when feed changes', function(done) {
         expect($('.header').text() != originalHeader).toBe(true);
         done();
       });
    });
});
