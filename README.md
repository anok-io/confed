# CONFED Ⓐ

CONFED is a [Sails v1](https://sailsjs.com) application aimed to provide an organising platform for groups based on anarcho syndicalist principles of organising.

**CONFED is very much in active development and there is a lot to be done to get the basics started. I very much value contributions and hope to kick start something. Please start a discussion on discourse.anok.io or just drop in for a chat on Gitter**

[![Gitter](https://badges.gitter.im/anok-io/community.svg)](https://gitter.im/anok-io/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

* [**Bootstrap 4**](http://getbootstrap.com/docs/4.0/getting-started/introduction/) - Front-end component library
* [**Font Awesome 4**](http://fontawesome.io/icons/) - Icons
* [**Vue.js**](https://vuejs.org/) - Front-end framework
* [**parasails.js**](https://npmjs.com/package/parasails) - Thin layer of bundled conventions for using Vue.js with Sails.js, and dynamically-generated SDK for handling AJAX and/or WebSocket requests from the front-end to the actions in the app.
* [**Docker**](https://www.docker.com) - Docker provides easily repeatable development, build, test, and production environments.

The main aim of this software is to allow groups to come to decisions between autonomous groups. We hope that this provides a framework not only of decision making that is equitable but increases the understanding of what anarchist methods of organising entail. It is not a replacement for face to face organising as this codebase is limited and static, whereas in anarchist praxis the structures of organising allow fluid interactions. It is however, hopefully a catalyst for groups to better coordinate between themselves, build systems of accountability, and avoid the [Tyranny of Structurelessness](https://www.jofreeman.com/joreen/tyranny.htm) that can have personality politics and friendship networks control movements.

## Structure

Members are able to form groups by inviting other members, or starting their own 'Initiative' in search of members. Members can only be connected to one group.

A group is required to have at least 3 members before being able to form a local, a local can be joined by other groups in the same region, upon agreement by all groups in the local. This same methodology cascades 'up' as groups federate.

Decisions that are raised at the local level by a group and the decisions of the local are taken back to the groups for ratification by the members.

Currently working on:
* A User can create one group, or be a part of one group. 
* A User can invite others to the group they are part of, however a vote at the next meeting is required for the person to become a member.
* A User can create a Meeting, or set the regularity of the schedule (by default monthly)
* A User can submit an agenda item up to a week before the meeting 'due' date. All users are emailed on submit of an agenda item, and a full agenda sent out in email a week before the Due date.
* A user can vote on agenda items YES, NO, ABSTAIN, and comment (optional).
* Lack of a vote by the Due date for the meeting, is counted as ABSTAIN
* If a Group is part of a Local they are able to submit the agenda items that are voted up by their members to the agenda of the next meetings for all groups in the Local. And likewise with the Local to the Regional, and so forth.

**Groups** are affiliate of **Locals**

**Locals** are affiliate of **Regionals**

**Regionals** are affiliate of **Federations**

**Federations** are affiliate of **Confederations**

Anok.io is an initiative currently funded by a member affiliate of the [ASF-IWA](https://www.asf-iwa.org.au), the Australian section of the [International Workers Association](https://www.iwa-ait.org). It is not a project that is in any way a reflection of the ASF-IWA or the IWA-AIT. It is simply a project by a local affiliate.

Discussions around the features and planning is available via Anoki.io Discourse linked below.

### Links

* [Anok.io](https://anok.io)
* [Anok.io Discourse](https://discourse.anok.io)

### Version info

This app was originally generated on Fri Jun 07 2019 03:54:42 GMT+0000 (Coordinated Universal Time) using Sails v1.2.2.

<!-- Internally, Sails used [`sails-generate@1.16.12`](https://github.com/balderdashy/sails-generate/tree/v1.16.12/lib/core-generators/new). -->

<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->
