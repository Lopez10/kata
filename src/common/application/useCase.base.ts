export interface UseCase<Request, Response> {
    run(request?: Request): Response;
}