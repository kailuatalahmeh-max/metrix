import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';

const PRISMA_ERRORS = [
  Prisma.PrismaClientValidationError,
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientInitializationError,
] as const;

type PrismaError = InstanceType<(typeof PRISMA_ERRORS)[number]>;

@Catch(...PRISMA_ERRORS)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(exception: PrismaError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    console.log(exception.message);

    const knownErrors = [
      {
        catchingError: exception instanceof Prisma.PrismaClientValidationError,
        message: 'نوع البيانات المُرسلة غير صحيح',
        statusCode: 400,
      },
      {
        catchingError:
          exception instanceof Prisma.PrismaClientKnownRequestError &&
          exception.code === 'P2025',
        message: 'Record not found',
        statusCode: 404,
      },
      {
        catchingError:
          exception instanceof Prisma.PrismaClientKnownRequestError &&
          exception.code === 'P2002',
        message: 'Value already exists',
        statusCode: 409,
      },
      {
        catchingError:
          exception instanceof Prisma.PrismaClientInitializationError ||
          (exception instanceof Prisma.PrismaClientKnownRequestError &&
            exception.code === 'P1001'),
        message: 'Database is not available',
        statusCode: 503,
      },
    ];

    const matchedError = knownErrors.find((error) => error.catchingError);

    if (matchedError) {
      return response.status(matchedError.statusCode).json({
        statusCode: matchedError.statusCode,
        message: matchedError.message,
      });
    }

    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
