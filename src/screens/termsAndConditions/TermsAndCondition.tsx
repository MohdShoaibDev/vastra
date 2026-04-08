import Header from '@components/header/Header';
import React from 'react';
import { View, Text } from 'react-native';
import styles from '@screens/termsAndConditions/style';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store/store';

const TermsAndCondition = () => {
  const theme = useSelector((state: RootState) => state.theme);
  return (
    <View style={styles.container}>
      <Header title="Terms & Conditions" style={styles.header} />
      <Text style={{ color: theme.mainTextColor }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur
        dicta pariatur voluptatem neque fuga autem corporis voluptates
        cupiditate blanditiis consequuntur, consequatur dignissimos
        necessitatibus officia laborum accusantium ut illo minus modi! Unde
        obcaecati distinctio ex deserunt rem hic aperiam! Quos earum officia
        corrupti. Rem natus laudantium, facere sunt rerum impedit atque quas ut
        sequi ducimus fugiat debitis, fuga maxime distinctio consequatur
        voluptatibus nemo nisi asperiores! Necessitatibus expedita mollitia at
        quasi! Facilis maxime atque libero, quas eveniet optio modi. Accusantium
        nam tenetur laboriosam at illum deleniti eligendi dignissimos, fugiat
        porro molestiae tempora consequuntur eaque non aut possimus rem vero
        maiores molestias ipsa consectetur labore voluptatibus in. Enim,
        repudiandae at! Libero officiis, natus, impedit quae consequatur eum
        laborum, facilis consectetur quisquam exercitationem nulla eos ipsam
        deleniti. Earum exercitationem expedita, praesentium quaerat dignissimos
        minus consequuntur sunt aut eligendi recusandae perspiciatis hic placeat
        consequatur, excepturi veritatis. Debitis sint dolorum neque recusandae
        id magni, esse quisquam excepturi distinctio ullam quaerat accusantium
        labore temporibus voluptatum dignissimos, soluta dolore velit laudantium
        corporis nam? Adipisci eum similique saepe odio? A molestias, voluptas
        rem et dolore eligendi provident iusto officia accusantium modi.
        Delectus iste illum distinctio id aliquam dolore, deleniti rem in non
        consequatur nihil quasi incidunt harum, pariatur, minima tempora iure
        minus nisi ab repellendus aliquid eligendi quisquam accusamus. Eum
        deserunt enim repudiandae modi libero dolore id exercitationem ipsa hic
        debitis accusamus ullam eveniet tempore alias aut, incidunt, sit non
        voluptatum amet eligendi consequuntur soluta. Culpa, obcaecati
        consectetur aliquid sint totam accusantium atque iure deleniti assumenda
        facere? Voluptates, saepe.
      </Text>
    </View>
  );
};

export default TermsAndCondition;
