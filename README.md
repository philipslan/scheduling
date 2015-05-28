# scheduling

## Please read

After the user has finished selecting all the times and days they wish to schedule their appointment. Rails should take the array arraytimes and create date objects to be stored. 

Arraytimes is an array of arrays and is structred so that all the dates are sorted in descending order. For each item in arraytimes, the first item is an array with the date (the month and day value of the day you will be saving). The following items will be a time range (which is in military time for easy conversion to datetime) for when the appointment will take place. Both these items are arrays.

Example of item in Arraytimes:
Arraytimes: [ [11 , 1] , [[10 , 10] , [10 , 15]] , [[14 , 30] , [15 , 30]] ]
Note: in this given example of Arraytimes there is only one date that has appointments. 
There are scheduled appointments on: November 1st: 10:10 AM - 10:15 AM , November 1st: 02:30 PM - 03:30 PM