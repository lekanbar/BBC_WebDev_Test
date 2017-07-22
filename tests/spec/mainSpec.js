describe( "Sterling and Pennies Counter library", function () {
	
    describe( "Main counter function - counts total pound coins and pennies", function () {
    	
    	it("Test 1: 123p", function () {
            expect(countSterlingAndPennies("123p")).toMatch("1 x &pound;1, 1 x 20p, 1 x 2p, 1 x 1p");
        });
    	
    	it("Test 2: £12.34", function () {
            expect(countSterlingAndPennies("£12.34")).toMatch("6 x &pound;2, 1 x 20p, 1 x 10p, 2 x 2p");
        });
    	
    	it("Test 3: 13x", function () {
            expect(countSterlingAndPennies("13x")).toMatch("Error: Invalid input: Amount entered contains invalid characters.");
        });
    	
    	it("Test 4: 13p.02", function () {
            expect(countSterlingAndPennies("13p.02")).toMatch("Error: Invalid input - valid character in wrong position");
        });
    	
    	it("Test 5: £p", function () {
            expect(countSterlingAndPennies("£p")).toMatch("Error: Invalid input: Amount entered has missing value.");
        });
    	
    	it("Test 6: <empty>", function () {
            expect(countSterlingAndPennies("")).toMatch("Error: Invalid input: Input cannot be empty, please try again.");
        });
    });
});