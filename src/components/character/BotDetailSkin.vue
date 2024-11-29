<template>
    <div class="p-4">
        <table class="table table-dark">
            <thead>
                <tr class="text-center">
                    <th class="col-2 themed-grid-col">Show</th>
                    <th class="col themed-grid-col">Screen time</th>
                    <th class="col themed-grid-col">Voice line</th>
                    <th class="col themed-grid-col">Transformation</th>
                    <th class="col themed-grid-col">Alt transformation</th>
                    <th class="col themed-grid-col">Robot transformation</th>
                    <th class="col themed-grid-col">Death</th>
                </tr>
            </thead>
            <tbody v-if="show">
                <tr v-for="skin in show.skin" class="mx-2 text-center td-vertical-center table-active">
                    <td>/</td>
                    <td>{{ skin.screen_time }}</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                </tr>
                
            </tbody>   
        </table>
    </div>
</template>

<script>

import BotDetailSkinRow from '@/components/bot/BotDetailSkinRow.vue';

export default {
    name: "BotDetailSkin",
    components: {
        BotDetailSkinRow
    },
    props: ['show']
}
</script>