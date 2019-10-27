import React from "react";
import { Formik } from "formik";
import { GenericCheckBox } from "../../GenericComponents/GenericCheckBox";
import { Typography } from "@material-ui/core";
import { chromeStorageGet, chromeStorageKeys, chromeStorageSet } from "../../../utils/chromeStorage";
import { useEffect, useState } from "preact/hooks";
import formatDate from "date-fns/format";
import Fade from "@material-ui/core/Fade";

const dateUpdateWithCrossOverFadeEffect = async (
  setFieldValue,
  names = {
    crossOverFadeEffectShow: "crossOverFadeEffectShow",
    lastUpdate: "lastUpdate"
  },
  delay = 500
) => {
  setFieldValue(names.crossOverFadeEffectShow, false);
  await new Promise(resolve => setTimeout(resolve, delay));
  setFieldValue(names.lastUpdate, Date.now());
  setFieldValue(names.crossOverFadeEffectShow, true);
};

export const OptionsForm = () => {
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    (async () => {
      const enable_slack_url_search = await chromeStorageGet(
        chromeStorageKeys.options_enable_slack_url_search
      );

      const enable_bitbucket_slack_search = await chromeStorageGet(
        chromeStorageKeys.options_enable_bitbucket_slack_search
      );

      setInitialValues({
        enable_slack_url_search,
        enable_bitbucket_slack_search
      });
      setLoading(false);
    })();
  }, []);

  if (loading) return null;

  return (
    <div>
      <Formik
        initialValues={{
          enable_slack_url_search: false,
          enable_bitbucket_slack_search: false,
          lastUpdate: null,
          crossOverFadeEffectShow: true,
          ...initialValues
        }}
        render={formik => (
          <form>
            <div
              style={{
                marginBottom: "1.25rem"
              }}
            >
              <Typography variant="h5">Content Scripts Settings</Typography>

              <Fade
                in={formik.values.crossOverFadeEffectShow}
                timeout={{
                  enter: 300,
                  exit: 1000
                }}
              >
                <div>
                  <div
                    style={{
                      opacity: 0.5
                    }}
                  >
                    {formik.values.lastUpdate
                      ? `Saved at ${formatDate(formik.values.lastUpdate, "MMM dd yyyy - hh:mm:ss a")}`
                      : "Changes will take effect only on newly opened tabs."}
                  </div>
                </div>
              </Fade>

              <div
                style={{
                  opacity: 0.5,
                  marginTop: "0.3125rem"
                }}
              >
                Please refresh existing tabs to update.
              </div>
            </div>

            <div>
              <GenericCheckBox
                name="enable_slack_url_search"
                label="Enable Slack Url Search"
                onChange={async value => {
                  await chromeStorageSet(chromeStorageKeys.options_enable_slack_url_search, value);
                  await dateUpdateWithCrossOverFadeEffect(formik.setFieldValue);
                }}
              />
              <GenericCheckBox
                name="enable_bitbucket_slack_search"
                label="Enable Bitbucket Slack Search"
                onChange={async value => {
                  await chromeStorageSet(chromeStorageKeys.options_enable_bitbucket_slack_search, value);
                  await dateUpdateWithCrossOverFadeEffect(formik.setFieldValue);
                }}
              />
            </div>
          </form>
        )}
      />
    </div>
  );
};
