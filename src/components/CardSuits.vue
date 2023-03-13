<script setup>
const props = defineProps(['cardSuit'])
</script>

<template>
  <div v-if="props.cardSuit === 'D'" class="diamond">
    <div class="square"></div>
  </div>

  <div v-if="props.cardSuit === 'S'" class="spade">
    <div class="square"></div>
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="tail"></div>
  </div>

  <div v-if="props.cardSuit === 'H'" class="heart">
    <div class="square"></div>
    <div class="circle1"></div>
    <div class="circle2"></div>
  </div>

  <div v-if="props.cardSuit === 'C'" class="club">
    <div class="circle1"></div>
    <div class="circle2"></div>
    <div class="circle3"></div>
    <div class="tail"></div>
  </div>
</template>

<style scoped lang="scss">
$red: #c41010;
$black: #444444;

$s: 2px;
$t: 350ms;

html,
body {
  height: 100%;
  width: 100%;
}

body {
  background-color: #ffffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.diamond,
.spade,
.heart,
.club {
  // background-color: #ddd;
  width: 24 * $s;
  height: 24 * $s;
  margin: 4.5 * $s;
  position: relative;
  transform: rotate(45deg);
  cursor: pointer;
}

.diamond {
  .square {
    background-color: $red;
    position: absolute;
    width: 16 * $s;
    height: 16 * $s;
    top: 4 * $s;
    left: 4 * $s;
    transition: all $t;
  }

  &.circled {
    .square {
      border-radius: 50%;
      transform: scale(0.5);
    }
  }
}

.spade,
.club {
  .square,
  .circle1,
  .circle2,
  .circle3 {
    background-color: $black;
    position: absolute;
    transition: all $t;
  }
  .square {
    width: 12 * $s;
    height: 12 * $s;
    top: 4 * $s;
    left: 4 * $s;
  }
  .circle1,
  .circle2,
  .circle3 {
    width: 12 * $s;
    height: 12 * $s;
    border-radius: 6 * $s 6 * $s;
  }
  .circle1 {
    top: 4 * $s;
    left: 10 * $s;
    transition-duration: $t * 0.85;
  }
  .circle2 {
    top: 10 * $s;
    left: 4 * $s;
    transition-duration: $t * 0.85;
  }
  .circle3 {
    top: 2 * $s;
    left: 2 * $s;
  }
  .tail {
    position: absolute;
    width: 0;
    height: 0;
    top: 17.5 * $s;
    left: 17.5 * $s;
    border-top: 5 * $s solid $black;
    border-right: 5 * $s solid transparent;
    transition: all $t;
  }

  &.circled {
    .circle1 {
      transform: scale(0.5) translate(-8 * $s, 4 * $s);
      transition-duration: $t;
    }
    .circle2 {
      transform: scale(0.5) translate(4 * $s, -8 * $s);
      transition-duration: $t;
    }
    .circle3 {
      transform: scale(0.666) translate(6 * $s, 6 * $s);
    }
    .square {
      border-radius: 50%;
      transform: scale(0.666) translate(3 * $s, 3 * $s);
      transition-duration: $t * 0.9;
    }
    .tail {
      transform: scale(0.666) translate(-10 * $s, -10 * $s);
    }
  }
}

.heart {
  .square,
  .circle1,
  .circle2 {
    background-color: $red;
    position: absolute;
    transition: all $t;
  }
  .square {
    width: 12 * $s;
    height: 12 * $s;
    top: 7 * $s;
    left: 7 * $s;
    transition-duration: $t;
  }
  .circle1,
  .circle2 {
    width: 12 * $s;
    height: 12 * $s;
    border-radius: 6 * $s 6 * $s;
    transition-duration: $t * 0.85;
  }
  .circle1 {
    top: 1 * $s;
    left: 7 * $s;
  }
  .circle2 {
    top: 7 * $s;
    left: 1 * $s;
  }

  &.circled {
    .circle1,
    .circle2 {
      transition-duration: $t;
    }
    .circle1 {
      transform: scale(0.5) translate(0, 12 * $s);
    }
    .circle2 {
      transform: scale(0.5) translate(12 * $s, 0);
    }

    .square {
      border-radius: 50%;
      transform: scale(0.666) translate(-1 * $s, -1 * $s);
      transition-duration: $t * 0.9;
    }
  }
}
</style>
