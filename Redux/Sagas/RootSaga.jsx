import { all } from "redux-saga/effects"
import MaincategorySagas from "./MaincategorySagas"
import SubcategorySagas from "./SubcategorySagas"
import BrandSagas from "./BrandSagas"
import ProductSagas from "./ProductSagas"
import FeatureSagas from "./FeatureSagas"
import FaqSagas from "./FaqSagas"
import CartSagas from "./CartSagas"
import WishlistSagas from "./WishlistSagas"
import CheckoutSagas from "./CheckoutSagas"
import UserSagas from "./UserSagas"
import TestimonialSagas from "./TestimonialSagas"
import ContactUsSagas from "./ContactUsSagas"
import NewsletterSagas from "./NewsletterSagas"
import SettingSagas from "./SettingSagas"

export default function* RootSaga() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        ProductSagas(),
        FeatureSagas(),
        FaqSagas(), 
        SettingSagas(),
        CartSagas(),
        WishlistSagas(),
        CheckoutSagas(),
        UserSagas(),
        TestimonialSagas(),
        ContactUsSagas(),
        NewsletterSagas(),
    ])
}
