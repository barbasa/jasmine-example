describe( "Convert library", function () {

	describe( "distance converter", function () {

    	    it("converts centimeters to yards", function () {
		var args = {'from' : 'cm', 'to' : 'yards', 'value' : 2000};
		expect(CONVERTER.convert(args)).toEqual(21.87);
	    });

	    it("converts inches to centimeters", function () {
		var args = {'from' : 'in', 'to' : 'cm', 'value' : 12};
		expect(CONVERTER.convert(args)).toEqual(30.48);
	    });
	 
		});
 
        describe( "volume converter", function () {

		it("converts litres to gallons", function () {
			var args = {'from' : 'litres', 'to' : 'gallons', 'value' : 3};
			expect(CONVERTER.convert(args)).toEqual(0.66);
		});
		 
 
    	});
});
