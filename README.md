- FIELD TECH -

LARGER GOAL: Create a platform where techs can manage their day to day.

PROJECT GOAL: Eliminate any "double work" the tech when going back and form from JONAS to the Field Tech Service Ticket.


This project is being revisited in order to identify and eliminate the double work the tech's are required to do when moving between the Jonas Ticket and ours. We will take this as an opportunity to restructure the old Service Ticket to broaden it into a "Feld Tech" app. By doing this we intend to create our first arm/branch/app of a greater "Vogel Suite".

DOUBLE WORK:
- WO Information
- Customer Information
- Contract Information
- Service Items / and information
- Checklist
- Email Summary / Invoice / Checklist
- Store Summary / Invoice / Checklist

There is currently testing on the JONAS API, and it looks possible to gather the WO, Customer, Contract, and Service Item Information using the API. An interface is being created now and can be further tested in this project. The interface will start as read only, and does limit some of the double work we can truly eliminate this round. The success of the interface will decide if write capabilities are written in.

The checklist is one thing that (on the residential side) is not implemented in the JONAS ticket. This puts the burden on the FT to manage and match checklists. It is good that there are not as many checklists as the commercial side, and should give us a chance to test some different methods using with a shorter list. The methods tested will be scaled and used for the commercial side.

Emailing the customer requires a server to prepare and administer the emails. We do have an application that achieves this, and can be taken and tested in an API on an ec2 instance to see if it still works. The success of this means we can further the idea and create an VAPI as a service. This would then work along side the VAPI store.
