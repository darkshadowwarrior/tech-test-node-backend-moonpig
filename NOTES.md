Please add any additional notes here…

I have made an assumption that if a user calls /cards/card001 with no sizeId 
then we should return a card with the base price and all sizes according to the card from the 3rd party service.

However if we receive the sizeId then we can make an informed decision of which sizes to fetch and display

TODO: <br />
    <strike>- Currently only catching the errors in the services. So I'm not actually handling errors right now. </strike><br />
    - Write more tests. I have only covered the test cases porovided for the integration tests. I need to do move coverage<br />
    - SPIKE: Is there a way to optimize how we combine the card, size and template together<br />
    - I'm not returning a typed object from the usecases - this needs to be updated <br />
    - Add tests for formatAmountInPounds - not a hard requirement but a nice to have in case something changes and it breaks<br />

Ideas and thoughts:<br />
    - I am still using the same axios code for all services. This could be a single service but leaving it as is for seperation of concerns<br />
    - Could we change the types to domain objects and introduce inheritence or is this overkill for this small application?