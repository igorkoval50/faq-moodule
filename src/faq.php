<?php declare(strict_types=1);

namespace Faq;

use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\ActivateContext;
use Shopware\Core\Framework\Plugin\Context\DeactivateContext;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Shopware\Core\Framework\Plugin\Context\UpdateContext;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Uuid\Uuid;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;

class faq extends Plugin
{
    public function install(InstallContext $installContext): void
    {
        // Do stuff such as creating a new payment method
        $this->installCustomFields($installContext->getContext());
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        parent::uninstall($uninstallContext);

        if ($uninstallContext->keepUserData()) {
            return;
        }

        // Remove or deactivate the data created by the plugin
    }

    public function activate(ActivateContext $activateContext): void
    {
        // Activate entities, such as a new payment method
        // Or create new entities here, because now your plugin is installed and active for sure
    }

    public function deactivate(DeactivateContext $deactivateContext): void
    {
        // Deactivate entities, such as a new payment method
        // Or remove previously created entities
    }

    public function update(UpdateContext $updateContext): void
    {
        // Update necessary stuff, mostly non-database related
        $this->installCustomFields($updateContext->getContext());
    }

    public function postInstall(InstallContext $installContext): void
    {
    }

    public function postUpdate(UpdateContext $updateContext): void
    {
    }

    private function installCustomFields(Context $context)
    {
        /** @var EntityRepositoryInterface $customFieldSetRepository */
        $customFieldSetRepository = $this->container->get('custom_field_set.repository');

        // Check if the custom field set already exists
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsAnyFilter('name', ['faq_category_manufacturer']));
        $existingCustomFieldSets = $customFieldSetRepository->search($criteria, $context)->getEntities();

        $customFieldSetId = Uuid::randomHex();
        $relations = [
            [
                'entityName' => 'product_manufacturer'
            ]
        ];

        if ($existingCustomFieldSets->count() > 0) {
            // Use the existing custom field set ID and don't set relations again
            $relations = [];
            $customFieldSetId = $existingCustomFieldSets->first()->getId();
        }

        $customFieldSet = [
            [
                'id' => $customFieldSetId,
                'name' => 'faq_category_manufacturer',
                'config' => [
                    'label' => [
                        'en-GB' => 'FAQ Category for Manufacturer',
                        'de-DE' => 'FAQ Kategorie für Hersteller'
                    ]
                ],
                'relations' => $relations,
                'customFields' => [
                    [
                        'name' => 'faq_category',
                        'type' => 'text',
                        'config' => [
                            'label' => [
                                'en-GB' => 'FAQ Category',
                                'de-DE' => 'FAQ Kategorie'
                            ],
                            'customFieldType' => 'text',
                            'customFieldPosition' => 1,
                        ]
                    ]
                ]
            ]
        ];

        $customFieldSetRepository->upsert($customFieldSet, $context);
    }
}
