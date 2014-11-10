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


    it("throws an error when passed an unknown from-unit", function () {
        var testFn = function () {
            var args = {'from' : 'inexistent_from', 'to' : 'cm', 'value' : 12};
            CONVERTER.convert(args);
        }
        expect(testFn).toThrow(new Error("unrecognized from-unit"));
    });

    it("throws an error when passed an unknown to-unit", function () {
        var testFn = function () {
            var args = {'from' : 'in', 'to' : 'inexistent_to', 'value' : 12};
            CONVERTER.convert(args);
        }
        expect(testFn).toThrow(new Error("unrecognized to-unit"));
    });


    describe( "can convert ", function () {
        it("cm is true", function () {
            expect(CONVERTER.canConvert('cm')).toBeTruthy();
        });

        it("inexistent unit is false", function () {
            expect(CONVERTER.canConvert('I_dont_exists')).toBeFalsy();
        });

    });


    describe("on success Ajax call", function() {

            // Make sure we mock/unmock the requests
            beforeEach(function() {
                jasmine.Ajax.install();
            });

            afterEach(function() {
                jasmine.Ajax.uninstall();
            });

            it("hits the success function", function() {
                var doneFn = jasmine.createSpy("success");
                var notDoneFn = jasmine.createSpy('onFailure');

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(args) {
                    this.readyState == this.DONE
                        ? doneFn(this.responseText, this.status)
                        : notDoneFn(this.responseText, this.status);
                };

                jasmine.Ajax.requests.mostRecent().response({
                    "status": 200,
                    "contentType": 'text/plain',
                    "responseText": 'awesome response'
                });

                CONVERTER.convertRemote({
                        "from":  'from_test',
                        "to":    'to_test',
                        "value": 'value_test'
                });

                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/removeConvertService');
                expect(notDoneFn).not.toHaveBeenCalled();
                expect(doneFn).toHaveBeenCalledWith('awesome response', 200);

            });

         
    });

/*

    describe("on fail Ajax call", function() {

            // Make sure we mock/unmock the requests
            beforeEach(function() {
                jasmine.Ajax.install();
                spyOn(CONVERTER, 'convertRemote').andCallThrough(); 
                spyOn(this, 'onSuccess');
                spyOn(this, 'onFailure');

            });

            afterEach(function() {
                jasmine.Ajax.uninstall();
            });

            it("hits the fail function", function() {
             
                jasmine.Ajax.requests.mostRecent().response({
                    "status": 500,
                    "contentType": 'text/plain',
                    "responseText": ''
                });

                CONVERTER.convertRemote({
                        "from":  'from_test',
                        "to":    'to_test',
                        "value": 'value_test'
                });

                expect(jasmine.Ajax.requests.mostRecent().url).toBe('/removeConvertService');
                expect(this.onFailure).toHaveBeenCalled();
                expect(this.onSuccess).not.toHaveBeenCalled();

            });

         
    });


    describe("Ajax other way!", function() {
        var onSuccess, onFailure;

        describe("on success", function() {

            var onSuccess;
            beforeEach(function() {
                jasmine.Ajax.install();
                onSuccess = jasmine.createSpy( "success");
                onError   = jasmine.createSpy( "error");

                CONVERTER.convertRemote({
                            "from":  'from_test',
                            "to":    'to_test',
                            "value": 'value_test'
                });

                jasmine.Ajax.requests.mostRecent().response({
                    "status": 500,
                    //"contentType": 'text/plain',
                    //"responseText": 'awesome response'
                });


                request = jasmine.Ajax.requests.mostRecent();
                expect(request.url).toBe('/removeConvertService');

            });


            it("calls success", function() {
                expect(onSuccess).toHaveBeenCalled();
                expect(onError).not.toHaveBeenCalled();

//                var successArgs = onSuccess.calls.mostRecent().args[0];

 //               expect(successArgs.length).toEqual(1);
  //              expect(successArgs[0]).toEqual(jasmine.any(Venue));
                
            });
        });

    });
*/

});
