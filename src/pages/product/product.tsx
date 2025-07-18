import { useParams } from 'react-router';
import styles from './product.module.scss';
import { useEffect, useState } from 'react';

import { Review } from '../../components/review/review';
import { Rating } from '../../components/rating/rating';
import { Button } from '../../components/button/button';
import { selectProduct } from '../../store/slices/productSlice';
import { useSelector } from 'react-redux';
import { ProductPopUp } from '../../components/product_pop_up/product_pop_up';
import { getProduct } from '../../store/thunks/product';
import { useAppDispatch } from '../../store/store';

export function Product() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const dispatch = useAppDispatch();
  const { product, isLoading, hasError } = useSelector(selectProduct);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (hasError) {
    return <div>Opps, something went wrong, please try later!</div>;
  }
  return (
    <>
      {product ? (
        <div className={styles.base}>
          <div className={styles.contanier}>
            <div className={styles.product}>
              <div
                className={styles.image}
                onClick={() => setIsPopupVisible(true)}
              >
                <img src={product.images[0]} alt="image" />
              </div>

              <div className={styles.mainInfo}>
                <div className={styles.title}>
                  <p>{product.title}</p>
                </div>

                <div className={styles.priceAndRating}>
                  <div className={styles.price}>
                    <p>₹ {product.price}</p>
                  </div>
                  <div className={styles.rating}>
                    <p className={styles.ratingTitle}>Essence </p>
                    <Rating />
                    <p className={styles.ratingValue}>{product.rating}</p>
                  </div>
                </div>

                <div className={styles.description}>
                  <p className={styles.descriptionTitle}>Description </p>
                  <p className={styles.descriptionInfo}>
                    {product.description}
                  </p>
                </div>

                <Button title="Add to Cart" className={styles.addButton} />
              </div>
            </div>
            <ul className={styles.review}>
              <div className={styles.reviewTitle}>
                <p>Review Lists</p>
              </div>
              {product.reviews.map((review, id) => (
                <li key={id}>
                  <Review
                    rating={review.rating}
                    comment={review.comment}
                    name={review.reviewerName}
                    date={review.date}
                  />
                </li>
              ))}
            </ul>
          </div>
          <ProductPopUp
            image={product?.images[0]}
            isVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
          />
        </div>
      ) : null}
    </>
  );
}
