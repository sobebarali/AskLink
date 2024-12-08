import { CustomError } from "~/utils/customError";
import Logging from "~/utils/logging";

export default async function chatSend(
  { question }: { question: string },
  requestId: string,
) {
  try {
    Logging.info(`${requestId} [CHAT] - SEND repository operation started`);
    // Perform DB operation here
    Logging.info(`${requestId} [CHAT] - SEND repository operation completed`);
    return { isSuccess: true }; // Return appropriate result
  } catch (err: any) {
    Logging.error(
      `${requestId} [CHAT] - SEND repository operation failed ${err}`,
    );
    throw new CustomError("DB_ERROR", `Failed to send chat`, 500);
  }
}
