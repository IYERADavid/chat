import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { UIKitSettingsBuilder } from "@cometchat/uikit-shared"
import { CometChatUIKit } from '@cometchat/chat-uikit-angular';



//create the builder
const uiKitSettings = new UIKitSettingsBuilder()
  .setAppId(environment.COMETCHAT_CONSTANTS.APP_ID)
  .setRegion(environment.COMETCHAT_CONSTANTS.REGION)
  .setAuthKey(environment.COMETCHAT_CONSTANTS.AUTH_KEY)
  .subscribePresenceForFriends()
  .build();

if (environment.production) {
  enableProdMode();
}

CometChatUIKit.init(uiKitSettings)?.then(()=>{
  //load your root module
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
})
