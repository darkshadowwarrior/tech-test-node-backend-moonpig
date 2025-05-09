Please add any additional notes here…

I have made an assumption that if a user calls /cards/card001 with no sizeId 
then we should return a card with the base price and all sizes according to the card from the 3rd party service.

However if we receive the sizeId then we can make an informed decision of which sizes to fetch and display