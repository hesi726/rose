namespace rose {

    export interface IAudioPathHandler {
        (audioKey: string): string
    }

    let _volume = 1;
    let _audioEnabled = true;//音效默认打开
    let _bgMusicEnabled = false;//背景音乐默认关闭
    let _playingMusic: egret.Sound;
    let _playingMusicChannel: egret.SoundChannel;
    let _audioPathHandler: IAudioPathHandler;

    export function isAudioEnabled() {
        return _audioEnabled;
    };

    export function setAudioEnabled(isAudio: boolean) {
        _audioEnabled = isAudio;
    };

    export function isBgMusicEnabled() {
        return _bgMusicEnabled;
    };

    export function setBgMusicEnabled(isBgMusic: boolean) {
        _bgMusicEnabled = isBgMusic;
    };

    export function registerAudioPathHandler(handler: IAudioPathHandler): void {
        _audioPathHandler = handler;
    };

    export function getAudioPath(audioKey: string): string {
        return _audioPathHandler ? _audioPathHandler(audioKey) : audioKey;
    };

    /** 播放一个音效 */
    export async function playAudio(audioPath: string, loops = 1): Promise<void | egret.SoundChannel> {
        if (isAudioEnabled()) {
            try {
                let soundEffect: egret.Sound = await R.getStatusRes(getAudioPath(audioPath));
                soundEffect.type = egret.Sound.EFFECT;
                const soundEffectChannel = soundEffect.play(0, loops);
                soundEffectChannel.volume = _volume;
                return Promise.resolve(soundEffectChannel);
            } catch (err) {
                return Promise.reject(err);
            }
        }
        return Promise.resolve();
    };

    /** 停止一个音效*/
    export function pauseAudio(audioPath: string): void {

    };

    /** 播放一个背景音乐*/
    export function playMusic(audioPath: string): void {
        if (isBgMusicEnabled()) {
            R.getStatusRes(getAudioPath(audioPath)).then((music: egret.Sound) => {
                pauseMusic();
                _playingMusic = music;
                _playingMusic.type = egret.Sound.MUSIC;
                resumeMusic();
            }).catch(err => {
                console.error('播放背景音乐失败>>>', err);
            });
        }
    };

    /**
     * 暂停背景音乐
     */
    export function pauseMusic(): void {
        if (_playingMusicChannel) {
            _playingMusicChannel.stop();
        }
    };

    /**
     * 恢复背景音乐
     */
    export function resumeMusic(): void {
        if (isBgMusicEnabled() && _playingMusic) {
            _playingMusicChannel = _playingMusic.play();
            _playingMusicChannel.volume = _volume;
        }
    };

    /**
     * 设置背景音乐音量
     * @param volume
     */
    export function setMusicVolume(volume: number): void {
        _volume = volume;
        if (_playingMusicChannel) {
            _playingMusicChannel.volume = _volume;
        }
    };

    export function pushMusic(audioPath: string, loop?: boolean): void {

    };

    export function popMusic(): void {

    };

    export function replaceMusic(audioPath: string, loop?: boolean): void {

    };
}
