// lib/converterVideo.js
import {FFmpegKit, FFmpegKitConfig, ReturnCode} from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';

import {FRAME_PER_SEC, FRAME_WIDTH} from '../App.js';

class FFmpegWrapper {
  static convertVideo(
    localFileName,
    videoURI,
    setConvertVideo,
    successCallback,
    errorCallback,
  ) {
    let outputVideoPath = `${RNFS.DownloadDirectoryPath}/${localFileName}_compress.mp4`;
    const ffmpegCommand = `-hide_banner -i ${videoURI} -vf "fps=30/1:round=up,scale=720:-2" -y -c:v libx264 -r 30 -g 240 -c:a libopus -b:a 48k ${outputVideoPath}`;

    console.log(
            `${ffmpegCommand}`,
          )

    FFmpegKit.executeAsync(
      ffmpegCommand,
      async session => {
        const state = FFmpegKitConfig.sessionStateToString(
          await session.getState(),
        );
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();
        const duration = await session.getDuration();
        const output = await session.getOutput();



        if (ReturnCode.isSuccess(returnCode)) {

          setConvertVideo({
            uri: outputVideoPath,
            timeProcess: duration,
          })
          console.log(
            `Encode completed successfully in ${duration} milliseconds;.`,
          );
          console.log(`Check at ${outputVideoPath}`);
          console.log(session)
          successCallback(outputVideoPath);
        } else {
          console.log('Encode failed. Please check log for the details.');
          console.log(
            `Encode failed with state ${state} and rc ${returnCode}.${
              (failStackTrace, '\\n')
            }`,
          );
          errorCallback();
        }
      },
      log => {
        console.log(log.getMessage());
      },
      statistics => {
        console.log(statistics);
      },
    ).then(session =>
      console.log(
        `Async FFmpeg process started with sessionId ${session.getSessionId()}.`
      ),
    );
  }
}

export default FFmpegWrapper;
