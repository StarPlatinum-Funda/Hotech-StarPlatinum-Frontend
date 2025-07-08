import {MessageUpdateRequest} from "./message.update-request";

export interface MessageDialogData extends MessageUpdateRequest {
  isUpdate: boolean;
}
