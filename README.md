- FIELD TECH -

LARGER GOAL: Create a platform where techs can manage their day to day.

PROJECT GOAL: Eliminate any "double work" the tech when going back and form from JONAS to the Field Tech Service Ticket.

This project is being revisited in order to identify and eliminate the double work the tech's are required to do when moving between the Jonas Ticket and ours. We will take this as an opportunity to restructure the old Service Ticket to broaden it into a "Feld Tech" app. By doing this we intend to create our first arm/branch/app of a greater "Vogel Suite".

DOUBLE WORK: (describes method) (describes % ability to help)
- WO Information (JONAS api) (100%)
- Customer Information (JONAS api) (100%)
- Contract Information (JONAS api) (100%)
- Service Items / and information (JONAS api) (100%)
- Checklist (VAPI api) (100%)
- Store Summary / Invoice / Checklist (JONAS mobile upload) (100%)
- Email Summary / Invoice / Checklist (VAPI api) (60%)

There is currently testing on the JONAS API, and it looks possible to gather the WO, Customer, Contract, and Service Item Information using the API. An interface is being created now and can be further tested in this project. The interface will start as read only, and does limit some of the double work we can truly eliminate this round. The success of the interface will decide if write capabilities are implemented.

The checklist is one thing that (on the residential side) is not implemented in the JONAS ticket. This puts the burden on the FT to manage and match checklists. It is good that there are not as many checklists as the commercial side, and should give us a chance to test some different methods using with a shorter list. The methods tested will be scaled and used for the commercial side.

Emailing the customer requires a server to prepare and administer the emails. We do have an application that achieves this, and can be taken and tested in an API on an ec2 instance to see if it still works. The success of this means we can further the idea and create an VAPI as a service. This would then work along side the VAPI store.

TODO:
- Move/update repo to web environment
- Reorganize file structures to prepare for application separation
- Import our Titlebar to work on each page (check)
- Set up quick actions to take over for some of the buttons on the page (Save, Delete, etc.)
- Seperate Systems/Repairs, Membership Options, Presentation using Viewcontroller
    - Attempt a few different layouts as time allows
- Create all forms (HTML?)
    - Rewards Membership Agreement
    - Leak Search Notification
