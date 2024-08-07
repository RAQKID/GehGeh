import { BaseCommand } from "../../base/BaseCommand.js";
import { makeEmbed } from "../../utils/makeEmbed.js";

export class PauseCommand extends BaseCommand {
    constructor(client) {
        super(client, {
            slash: {
                name: "pause",
                description: "Pauses the current playing track"
            },
            category: "Music"
        });
    }

    get connectionChecking() {
        return { memberInVoice: true, dispatcherExists: true, memberInSameVoice: true, isPlaying: true };
    }

    async execute(ctx) {
        const dispatcher = this.client.queue.get(ctx.guild.id);

        await dispatcher.player?.setPaused(true);

        ctx.send({
            embeds: [
                makeEmbed("success", `Paused the player`)
            ]
        });
    }
}
