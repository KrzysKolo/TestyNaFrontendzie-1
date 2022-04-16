import React from 'react';
import { getTheBestPromotionForDate } from '../getTheBestPromotionForDate';
import { getPromotions } from '../../mocks/getPromotion';

describe('getTheBestPromotionForDate', () => {
  const promotions = getPromotions();

  it('should return cod for current promotion', () =>{
      const promo = getTheBestPromotionForDate(new Date('2022-04-20'), promotions);
      expect(promo.discount.code).toEqual("ŚWIĄTECZNA_PROMOCJA");
});

it("should return the best promotion in a given period", () => {
  const today = new Date("2022-04-16");
  const theBestPromotionForDate = getTheBestPromotionForDate(
    today,
    promotions
  );
  expect(theBestPromotionForDate).toEqual(promotions[1]);
});;
});