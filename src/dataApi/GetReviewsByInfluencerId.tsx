import { collection, DocumentSnapshot, endAt, endBefore, getDocs, limit, limitToLast, orderBy, Query, query, QueryFieldFilterConstraint, QuerySnapshot, startAfter, where } from "firebase/firestore";
import { Review } from "../model/Review";
import { db } from "../utils/FirebaseConfig";


async function getReviewsByInfluencerId(influencerId: string): Promise<Review[]> {
  const reviewsCollectionRef = collection(db, "reviews");
  const reviewQuery = query(reviewsCollectionRef, where("influencerId", "==", influencerId), orderBy("date", "desc"));
  const reviewsSnapshot = await getDocs(reviewQuery);
  const reviewsList: Review[] = reviewsSnapshot.docs.map(doc => ({
    postId: doc.id,
      ...doc.data()}) as Review);
  // console.log(reviewsList);
  return reviewsList;
}

async function getReviewsWithPagination(whereClause: QueryFieldFilterConstraint, pageSize: number, cursor: DocumentSnapshot | null , mode: "next" | "previous" | "backFromLast" | "initial"): Promise<QuerySnapshot> {
  const reviewsCollectionRef = collection(db, "reviews");
  let reviewQuery: Query;
  if (mode === "initial"){
    reviewQuery = query(reviewsCollectionRef, whereClause, orderBy("date", "desc"), limit(pageSize));
  } else if (mode === "next"){
    reviewQuery = query(reviewsCollectionRef, whereClause, orderBy("date", "desc"), startAfter(cursor), limit(pageSize));
  } else if (mode === "previous"){
    reviewQuery = query(reviewsCollectionRef, whereClause, orderBy("date", "desc"), endBefore(cursor), limitToLast(pageSize));
  } else if (mode === "backFromLast"){
    reviewQuery = query(reviewsCollectionRef, whereClause, orderBy("date", "desc"), endAt(cursor), limitToLast(pageSize));
  } else {
    throw new Error("Invalid pagination mode.");
  }
  const reviewsSnapshot = await getDocs(reviewQuery);
  return reviewsSnapshot;
  // const reviewsList: Review[] = reviewsSnapshot.docs.map(doc => ({
  //   postId: doc.id,
  //     ...doc.data()}) as Review);
  // return reviewsList;
}


export {getReviewsByInfluencerId, getReviewsWithPagination};
