Please add any additional notes here…

I have made an assumption that if a user calls /cards/card001 with no sizeId 
then we should return a card with the base price and all sizes according to the card from the 3rd party service.

However if we receive the sizeId then we can make an informed decision of which sizes to fetch and display

TODO: 
    - Currently only catching the errors in the services. So I'm not actually handling errors right now. 
    - Write more tests. I have only covered the test cases porovided for the integration tests. I need to do move coverage
    - SPIKE: Is there a way to optimize how we combine the card, size and template together
    - I'm not returning a typed object from the usecases - this needs to be updated 
    - Add tests for formatAmountInPounds - not a hard requirement but a nice to have in case something changes and it breaks

Ideas:
    - I am still using the same axios code for all services. This could be a single service but leaving it as is for seperation of concerns
    - 