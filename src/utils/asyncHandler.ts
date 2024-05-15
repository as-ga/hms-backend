export const asyncHandler = (requestHander: Function) => {
  return (req: any, res: any, next: Function) => {
    Promise.resolve(
      requestHander(req, res, next).catch((err: any) => next(err))
    );
  };
};
