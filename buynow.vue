<template>
  <div class="heroBanner__subText" v-if="abortProcess == true">
    <p>
      Here are your
      <span class="highlight">
        <span v-html="quoteOptions.policyLength.value"></span> year &pound;<span v-bind:inner-html.prop="quoteOptions.totalCover.value | numberWithCommas"></span> cover options
      </span>
      <a href="#" class="update-cic-link" v-on:click="scrollTo('#update-cic')">change amounts</a>. Based on the answers you provided, you'll need to provide extra details to our insurers to apply for your policy.
    </p>
  </div>

  <div class="heroBanner__subText" v-else-if="noResults && !applyNowResultsOnly">
    <p>Based on your answers, we can't provide estimates just yet ... So it's time to call! Our advisers search the market (for free) to match you with policies that fit.</p>
  </div>

  <div
    class="heroBanner__subText" v-else-if="applyNowResultsOnly && !noResults">
    Below you'll see your policy estimates for &pound;<span v-bind:inner-html.prop="quoteOptions.totalCover.value | numberWithCommas"></span> 
    <span v-bind:inner-html="levelDecreasing"> Term Life Insurance 
    over <span v-html="quoteOptions.policyLength.value"></span> <span v-html="pluraliseCoverYears"></span>. Need advice on your options and next steps? Get in touch ASAP.
  </div>

  <div class="heroBanner__subText" v-else>
    <p>
      <span v-html="quoteOptions.headerMessage"></span>
      <a href="#" v-on:click="scrollTo('#update-cic')">change amounts</a>. Don't forget our exclusive
      <a
        href="https://www.lifesearch.com/How-We-Help/Claims-and-Care"
        target="_blank"
      >LifeSearch Care</a> and
      <a href="https://www.lifesearch.com/How-We-Help/Will-and-Trusts" target="_blank">Trust</a> services when you buy through us.
      Need advice on your options and next steps? Get in touch ASAP.
    </p>
  </div>
</template>