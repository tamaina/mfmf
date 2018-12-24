"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLocalUser = (user) => user.host === null;
exports.isRemoteUser = (user) => !exports.isLocalUser(user);
//#region Validators
function validateUsername(username, remote) {
    return typeof username == 'string' && (remote ? /^\w([\w-]*\w)?$/ : /^\w{1,20}$/).test(username);
}
exports.validateUsername = validateUsername;
function validatePassword(password) {
    return typeof password == 'string' && password != '';
}
exports.validatePassword = validatePassword;
function isValidName(name) {
    return name === null || (typeof name == 'string' && name.length < 50 && name.trim() != '');
}
exports.isValidName = isValidName;
function isValidDescription(description) {
    return typeof description == 'string' && description.length < 500 && description.trim() != '';
}
exports.isValidDescription = isValidDescription;
function isValidLocation(location) {
    return typeof location == 'string' && location.length < 50 && location.trim() != '';
}
exports.isValidLocation = isValidLocation;
function isValidBirthday(birthday) {
    return typeof birthday == 'string' && /^([0-9]{4})\-([0-9]{2})-([0-9]{2})$/.test(birthday);
}
exports.isValidBirthday = isValidBirthday;
//#endregion
