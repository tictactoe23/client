<template>
  <div class="container_tabel">
    <table v-if="games.length > 0">
      <tr>
        <th>№</th>
        <th>Время победы</th>
        <th>Победил</th>
      </tr>
      <tr v-for="game in games" :key="game.id">
        <td>{{ game.id }}</td>
        <td>{{ new Date(game.datetime) }}</td>
        <td class="win">{{ game.win }}</td>
      </tr>
    </table>
    <div class="info" v-else>Пока что игр нету</div>
  </div>
</template>

<script>
import { postRequest } from "@/plugins/requests";

export default {
  data() {
    return {
      games: [],
    };
  },
  async mounted() {
    const { data } = await postRequest("/get-game");
    this.games = data.games;
  },
};
</script>

<style scoped>
.container_tabel {
  max-width: 500px;
  margin: 100px auto;
}

table {
  background: #0f8b7f;
  border-spacing: 20px;
  border: 3px solid #09413b;
}
table tr {
  border: 3px solid #09413b;
}

.win {
  text-transform: uppercase;
}
.info {
  color: #09413b;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  border: 3px solid #09413b;
  background: #0f8b7f;
  padding: 15px;
}
</style>
