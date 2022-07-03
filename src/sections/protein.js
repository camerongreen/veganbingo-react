// This appears under the pictures on the square, and at the top of its
// individual page.
// Format: Text.
const heading = `Where do you get your protein?`;

// These are the alternative questions/acceptable statements at the top of the
// individual page.
// Format: Text.
const alternatives = `Where do you get your iron, or an obscure trace element.`;

// This is the short section at the top of the individual page.
// Format: HTML.
const short_answer = `<p>Suddenly when you say you are vegan, everyone becomes a poorly informed nutritionist.</p>`;

// This is the body of the individual page, use html liberally.
// Format: HTML.
const long_answer = `
<p>The real question is "Why are people worried about protein and nothing else?". Meat and dairy industry advertising
    reaches far more people than any unbiased nutritional advice. There's also a lot of poorly based folk wisdom left
    over from our long history of eating animals.</p>
<p>There has never been any study which has shown protein deficiency in people following a plant based diet. Protein
    deficiency is unknown in any population that eats enough calories.</p>
<p>Still I've had scores of people ask me this, from people as young as 10 to elite medical professionals. For some
    reason it pervades the culture, and most medical professionals simply don't get much nutritional training. When you
    look at what the peak nutritional bodies in the world say, you find similar things to the position of the American
    Dietetic Association:</p>
<blockquote>appropriately planned vegetarian diets, including total vegetarian or vegan diets, are healthful,
    nutritionally adequate, and may provide health benefits in the prevention and treatment of certain diseases.
    Well-planned vegetarian diets are appropriate for individuals during all stages of the life cycle, including
    pregnancy, lactation, infancy, childhood, and adolescence, and for athletes.
</blockquote>
<p>People who ask about protein also rarely even know how much protein we need. A rough guide is your weight in
    kilograms times 0.8 to 1.8 grams depending on how much weight bearing or endurance exercise you do.</p>
<p>Finally there is a serious point here, a vegan diet is different to the one many of us grew up eating. If you follow
    a vegan diet there are some things you need to think more about (B12, calcium, vitamin D, omega 3s), and others you
    can worry less about (Fibre, eating enough fruit and veg, Saturated Fat), but protein doesn't really come in to the
    picture.</p>
<p>In the end we should be getting our nutritional advice from university qualified Dietitians, not random people or a
    Vegan Bingo app on the Internet. Better diets will lead to better well being, as Hippocrates said, "Let thy food by
    thy medicine".</p>
`;

export {
  heading,
  alternatives,
  short_answer,
  long_answer,
};
