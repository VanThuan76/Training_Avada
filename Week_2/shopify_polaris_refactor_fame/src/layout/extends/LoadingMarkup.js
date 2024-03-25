import {
  Layout,
  SkeletonPage,
  LegacyCard,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText,
} from "@shopify/polaris";

const LoadingMarkup = () => {
  return (
    <SkeletonPage>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <TextContainer>
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={9} />
            </TextContainer>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};

export default LoadingMarkup;
