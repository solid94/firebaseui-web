/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Tests for the password sign-in page.
 */

goog.provide('firebaseui.auth.ui.page.PasswordSignInTest');
goog.setTestOnly('firebaseui.auth.ui.page.PasswordSignInTest');

goog.require('firebaseui.auth.ui.element.EmailTestHelper');
goog.require('firebaseui.auth.ui.element.FormTestHelper');
goog.require('firebaseui.auth.ui.element.InfoBarTestHelper');
goog.require('firebaseui.auth.ui.element.PasswordTestHelper');
goog.require('firebaseui.auth.ui.page.PageTestHelper');
goog.require('firebaseui.auth.ui.page.PasswordSignIn');
goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.events.KeyCodes');
goog.require('goog.testing.events');
goog.require('goog.testing.jsunit');
goog.require('goog.userAgent');


var root;
var component;
var emailTestHelper = new firebaseui.auth.ui.element.EmailTestHelper().
    excludeTests('testOnEnter_', 'testOnTextChanged_').
    registerTests();
var passwordTestHelper =
    new firebaseui.auth.ui.element.PasswordTestHelper().registerTests();
var formTestHelper =
    new firebaseui.auth.ui.element.FormTestHelper().registerTests();
var infoBarTestHelper =
    new firebaseui.auth.ui.element.InfoBarTestHelper().registerTests();


function setUp() {
  root = goog.dom.createDom(goog.dom.TagName.DIV);
  document.body.appendChild(root);
  component = new firebaseui.auth.ui.page.PasswordSignIn(
      goog.bind(
          firebaseui.auth.ui.element.FormTestHelper.prototype.onSubmit,
          formTestHelper),
      goog.bind(
          firebaseui.auth.ui.element.FormTestHelper.prototype.onLinkClick,
          formTestHelper),
      'user@example.com');
  component.render(root);
  emailTestHelper.setComponent(component);
  passwordTestHelper.setComponent(component);
  formTestHelper.setComponent(component);
  // Reset previous state of form helper.
  formTestHelper.resetState();
  infoBarTestHelper.setComponent(component);
}


function tearDown() {
  component.dispose();
  goog.dom.removeNode(root);
}


function testInitialFocus_email() {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    return;
  }
  component.dispose();
  component = new firebaseui.auth.ui.page.PasswordSignIn(
      goog.bind(
          firebaseui.auth.ui.element.FormTestHelper.prototype.onSubmit,
          formTestHelper),
      goog.bind(
          firebaseui.auth.ui.element.FormTestHelper.prototype.onLinkClick,
          formTestHelper));
  component.render(root);
  assertEquals(
      component.getEmailElement(),
      goog.dom.getActiveElement(document));
}

function testInitialFocus_password() {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    return;
  }
  assertEquals(
      component.getPasswordElement(),
      goog.dom.getActiveElement(document));
}


function testFocusToPasswordOnEmailEnter() {
  goog.testing.events.fireKeySequence(
      component.getEmailElement(), goog.events.KeyCodes.ENTER);
  assertEquals(
      component.getPasswordElement(),
      goog.dom.getActiveElement(document));
}


function testSubmitOnPasswordEnter() {
  goog.testing.events.fireKeySequence(
      component.getPasswordElement(), goog.events.KeyCodes.ENTER);
  formTestHelper.assertSubmitted();
}


function testPasswordSignIn_pageEvents() {
  // Run page event tests.
  var pageTestHelper = new firebaseui.auth.ui.page.PageTestHelper();
  // Dispose previously created container since test must run before rendering
  // the component in docoument.
  component.dispose();
  // Initialize component.
  component = new firebaseui.auth.ui.page.PasswordSignIn(
      goog.bind(
          firebaseui.auth.ui.element.FormTestHelper.prototype.onSubmit,
          formTestHelper),
      goog.bind(
          firebaseui.auth.ui.element.FormTestHelper.prototype.onLinkClick,
          formTestHelper),
      'user@example.com');
  // Run all page helper tests.
  pageTestHelper.runTests(component, root);
}


function testPasswordSignIn_getPageId() {
  assertEquals('passwordSignIn', component.getPageId());
}
