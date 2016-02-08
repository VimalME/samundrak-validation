// Generated by CoffeeScript 1.10.0
(function() {
  var Messages, chai, expect, should;

  chai = require('chai');

  should = chai.should();

  expect = chai.expect;

  Messages = new (require('../lib/messages'));

  describe("setMessage", function() {
    beforeEach(function(done) {
      Messages.destructor();
      return done();
    });
    it("should set message for a single field", function(done) {
      var builtMessage, message, rule;
      rule = 'required';
      message = 'This field is required';
      Messages.setMessage(rule, message);
      builtMessage = Messages.buildMessage(rule, 'name');
      expect(builtMessage).to.equal(message);
      return done();
    });
    it("should set bulk messages", function(done) {
      var builtMessage, message, messages;
      message = 'This field is required';
      messages = {
        'required': message
      };
      Messages.setMessages(messages);
      builtMessage = Messages.buildMessage('required', 'name');
      expect(builtMessage).to.equal(message);
      return done();
    });
    it("should set bulk messages and should convert dot strings to objects", function(done) {
      var builtMessage, message, messages, nameSpecific;
      message = 'This field is required';
      nameSpecific = 'Your name is required';
      messages = {
        'required': message,
        'name.required': nameSpecific
      };
      Messages.setMessages(messages);
      builtMessage = Messages.buildMessage('required', 'name');
      expect(builtMessage).to.equal(nameSpecific);
      return done();
    });
    return context("templating", function() {
      it("should replace {{field}} with field name", function(done) {
        var builtMessage, message, messages;
        message = "{{field}} is required to continue";
        messages = {
          'required': message
        };
        Messages.setMessages(messages);
        builtMessage = Messages.buildMessage('required', 'age');
        expect(builtMessage).to.equal("age is required to continue");
        return done();
      });
      it("should replace {{rule}} with rule applied", function(done) {
        var builtMessage, message, messages;
        message = "{{rule}} validation failed on {{field}}";
        messages = {
          'required': message
        };
        Messages.setMessages(messages);
        builtMessage = Messages.buildMessage('required', 'age');
        expect(builtMessage).to.equal("required validation failed on age");
        return done();
      });
      it("should replace {{value}} with value next to field", function(done) {
        var builtMessage, message, messages;
        message = "{{value}} is not valid email address";
        messages = {
          'email': message
        };
        Messages.setMessages(messages);
        builtMessage = Messages.buildMessage('email', 'email', null, 'something');
        expect(builtMessage).to.equal("something is not valid email address");
        return done();
      });
      it("should use arguments passed while defining rules", function(done) {
        var builtMessage, message, messages;
        message = "Your age must be over {{argument[0]}} and under {{argument[1]}}";
        messages = {
          'range': message
        };
        Messages.setMessages(messages);
        builtMessage = Messages.buildMessage('range', 'age', '18,42');
        expect(builtMessage).to.equal("Your age must be over 18 and under 42");
        return done();
      });
      return it("should access argument values using dot notation", function(done) {
        var builtMessage, message, messages;
        message = "Your age must be over {{argument.0}} and under {{argument.1}}";
        messages = {
          'range': message
        };
        Messages.setMessages(messages);
        builtMessage = Messages.buildMessage('range', 'age', '18,42');
        expect(builtMessage).to.equal("Your age must be over 18 and under 42");
        return done();
      });
    });
  });

}).call(this);
