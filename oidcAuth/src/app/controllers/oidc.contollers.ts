import type { Request, Response } from "express";

class oidcContoller {
  public async serviceDiscovery(req: Request, res: Response) {}

  public async signup(req: Request, res: Response) {}

  public async signin(req: Request, res: Response) {}

  public async issuerEndpoint(req: Request, res: Response) {}

  public async authorizationEndpoint(req: Request, res: Response) {}

  public async tokenEndpoint(req: Request, res: Response) {}

  public async jwksEndpoint(req: Request, res: Response) {}
}

export { oidcContoller };
