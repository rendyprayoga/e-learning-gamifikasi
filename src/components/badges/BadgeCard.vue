<template>
  <div>
    <!-- Card for Badge Requirements -->
    <div class="card-container">
      <div class="sidebar-container">
        <p>Syarat & Ketentuan</p>
      </div>
      <div class="main-content">
        <div class="placements">
          <h4>PEROLEHAN LENCANA</h4>
          <p>
            <span class="highlight">>> </span> Jika Point 1-20
            <span class="highlight">(Bronze)</span>
          </p>
          <p>
            <span class="highlight">>> </span> Jika Point 21-40
            <span class="highlight">(Silver &#9733;)</span>
          </p>
          <p>
            <span class="highlight">>> </span> Jika Point 41-70
            <span class="highlight">(Silver &#9733;&#9733;)</span>
          </p>
          <p>
            <span class="highlight">>> </span> Jika Point 71-90
            <span class="highlight">(Gold &#9733;)</span>
          </p>
          <p>
            <span class="highlight">>> </span> Jika Point 91-100
            <span class="highlight">(Gold &#9733;&#9733;)</span>
          </p>
        </div>
        <div class="max-rank">
          <h4>Tertinggi</h4>
          <span class="highlight">Gold &#9733;&#9733;</span>
          <div class="rank-icon"><IconRank /></div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="sidebar">
        <p>Score User</p>
      </div>
      <div class="main-content">
        <div class="user-score">
          <h4>Score yang Diraih</h4>
          <p>
            {{ $auth.user.name }} :
            <span class="highlight"
              >{{ $auth.user.avg_score }} Total Points</span
            >
          </p>
          <p>
            <span>Lencana : </span
            ><span class="highlight" v-html="badge"></span>
          </p>
          <div class="badge-icon"><component :is="badgeIcon" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconRank from '../../assets/img/gold2.svg';
import gold2Icon from '../../assets/img/gold2.svg';
import gold1Icon from '../../assets/img/gold1.svg';
import silver2Icon from '../../assets/img/silver2.svg';
import silver1Icon from '../../assets/img/silver1.svg';
import bronzeIcon from '../../assets/img/bronze.svg';

export default {
  components: {
    IconRank,
    gold1Icon,
    gold2Icon,
    silver1Icon,
    silver2Icon,
    bronzeIcon,
  },
  // data() {
  //   return {
  //     userScore: 21,
  //   };
  // },
  computed: {
    badge() {
      const score = this.$auth.user.avg_score;
      if (score >= 91) return 'Gold ' + this.generateStars(2);
      if (score >= 71) return 'Gold ' + this.generateStars(1);
      if (score >= 41) return 'Silver ' + this.generateStars(2);
      if (score >= 21) return 'Silver ' + this.generateStars(1);
      return 'Bronze';
    },
    badgeIcon() {
      const score = this.$auth.user.avg_score;
      if (score >= 91) return 'gold2Icon';
      if (score >= 71) return 'gold1Icon';
      if (score >= 41) return 'silver2Icon';
      if (score >= 21) return 'silver1Icon';
      return 'bronzeIcon';
    },
  },
  methods: {
    generateStars(count) {
      const star = '&#9733;';
      return star.repeat(count);
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  width: 20rem;
  height: 16rem;
  background-color: rgba(15, 22, 28);
  margin-top: 10rem;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.05);
  color: white;
}
.card-container {
  display: flex;
  width: auto;
  height: auto;
  background-color: rgba(15, 22, 28);
  margin-top: 1rem;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.7), 0 0 6px rgba(0, 0, 0, 0.05);
  color: white;
}

.sidebar-container {
  background-color: rgba(145, 34, 34, 0.8);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.sidebar {
  background-color: #e7b325;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.main-content {
  display: flex;
  justify-content: space-between;
  padding: 1.2rem;
  flex: 1;
}

.highlight {
  color: #cb9e24;
}

.max-rank,
.rank-icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}

.max-rank::before,
.rank-icon-container::before {
  content: '';
  position: absolute;
  left: -1rem;
  top: 0;
  bottom: 0;
  width: 0.1rem;
  background-color: #cb9e24;
}

.max-rank h4,
.rank-icon-container h4 {
  margin: 0;
}

.rank-icon {
  width: 100px;
  height: 50px;
  animation: flip 2s linear infinite;
}
.badge-icon {
  width: 100px;
  height: 50px;

  animation: flip 2s linear infinite;
}
@keyframes flip {
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

@media (max-width: 768px) {
  .card-container {
    flex-direction: column;
    max-width: 100%;
    height: auto;
  }
  .card {
    flex-direction: column;
    max-width: 100%;
    height: 20rem;
    margin-top: 4rem;
  }
  .sidebar-container {
    background-color: rgb(145, 34, 34);
    padding: 1rem;
    display: flex;
    writing-mode: horizontal-tb;
    border-radius: 10px;
  }
  .sidebar {
    background-color: #cb9e24;
    padding: 1rem;
    writing-mode: horizontal-tb;
    justify-content: center;
    border-radius: 10px;
  }
  .max-rank,
  .rank-icon-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
  }

  .max-rank::before,
  .rank-icon-container::before {
    content: '';
    position: absolute;
    left: -0.4rem;
    top: 0;
    bottom: 0;
    width: 0.1rem;
    background-color: #cb9e24;
  }
  .badge-icon {
    width: 120px;
    height: 70px;
    margin-left: 4rem;
    animation: flip 2s linear infinite;
  }
}
</style>
