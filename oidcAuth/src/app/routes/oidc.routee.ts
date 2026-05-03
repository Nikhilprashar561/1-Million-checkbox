import express from "express";

import { oidcContoller } from "../controllers/oidc.contollers.js";

const router = express.Router();
const oidcControllers = new oidcContoller();

router
  .route("/.well-known/openid-configuration")
  .get(oidcControllers.serviceDiscovery.bind(oidcControllers)); // service discovery endpoint

router.route("/signup").post(oidcControllers.signup.bind(oidcControllers)); // if user not register then go for signup and then signin
router.route("/signin").post(oidcControllers.signin.bind(oidcControllers)); // if user have account then go for signin and then get the token

router.route("/").get(oidcControllers.issuerEndpoint.bind(oidcControllers)); // issuer endpoint // Need middlewre here.

router // Need Middleware to check user have client id and secret or not ? or not ?
  .route("/auth")
  .get(oidcControllers.authorizationEndpoint.bind(oidcControllers)); // authorization endpoint

router.route("/token").get(oidcControllers.tokenEndpoint.bind(oidcControllers)); // token_endpoint // first validate the client id and secret then give to client

router // Client need public key to verify user
  .route("/.well-known/jwks.json")
  .get(oidcControllers.jwksEndpoint.bind(oidcControllers)); // jwks endpoint get public key

export { router as oidcRouter };
